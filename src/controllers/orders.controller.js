const Order = require("../models/order.model");
const OrderDetails = require("../models/orderDetails.model");
const Product = require("../models/product.model");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const { promisify } = require("util");
const { exec } = require("child_process");
const Commerce = require("../models/commerce.model");
const User = require("../models/users.model");
const moment = require("moment");

const asyncExec = promisify(exec);

exports.createOrder = async (req, res) => {
  try {
    const { user_id, commerce_id } = req.body;

    const order = await Order.create({
      user_id,
      commerce_id,
    });

    res.status(201).json({
      status: "Success",
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createOrderDetails = async (req, res) => {
  try {
    const { order_id, details, other } = req.body;

    if (!order_id) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    if (!details || details.length === 0) {
      return res.status(400).json({ error: "Order details are required" });
    }

    const order = await Order.findByPk(order_id);
    if (!order) {
      return res
        .status(404)
        .json({ error: `Order with ID ${order_id} not found` });
    }

    await Promise.all(
      details.map(async (detail) => {
        try {
          const product = await Product.findByPk(detail.product_id);
          if (!product) {
            throw new Error(`Product with ID ${detail.product_id} not found`);
          }

          const total_price = product.price * detail.quantity;

          await OrderDetails.create({
            order_id,
            product_id: detail.product_id,
            total_price,
            quantity: detail.quantity,
          });
        } catch (error) {
          console.error("Error creating order detail:", error);
          throw error;
        }
      })
    );

    await order.update({ other });

    res.status(201).json({
      status: "Success",
      message: "Order details created successfully",
    });
  } catch (error) {
    console.error("Error creating order details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { status: "active" },
      include: [{ model: OrderDetails, include: [{ model: Product }] }],
    });

    res.status(200).json({
      status: "Success",
      orders,
    });
  } catch (error) {}
};

exports.getOneOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({
      where: { id },
      include: [
        {
          model: OrderDetails,
          include: [{ model: Product }],
        },
        { model: Commerce },
        { model: User },
      ],
    });

    if (!order) {
      return res.status(404).json({ mesagge: "Order not found:" });
    }

    const pdfFilename = generateOrderPDF(order);

    const downloadLink = `/downloads/${pdfFilename}`;

    res.status(200).json({
      status: "Success",
      order,
      downloadLink,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

function generateOrderPDF(order) {
  const formattedDate = moment(order.createdAt).format("LL");

  const doc = new PDFDocument();
  const filename = `order_${order.id}.pdf`;
  const outputStream = fs.createWriteStream(`./downloads/${filename}`);

  doc.pipe(outputStream);

  doc.fontSize(20).text(order.commerce.name, { align: "center" });
  doc
    .fontSize(16)
    .text(`Direccion: ${order.commerce.address}`, { align: "center" })
    .moveDown(0.5);
  doc.fontSize(14).text(`Orden ID: ${order.id}`);
  doc.moveDown(0.5);

  doc
    .fontSize(12)
    .text(`Vendedor: ${order.user.first_name} ${order.user.last_name}`);
  doc.fontSize(12).text(`Fecha: ${formattedDate}`);
  doc.moveDown(0.5);
  if (order.other.length > 0) {
    doc.fontSize(12).fillColor("red").text(`IMPORTANTE: ${order.other}`);
  }

  doc.moveDown(1);

  let totalPrice = 0;

  order.ordersDetails.forEach((detail) => {
    doc
      .fontSize(12)
      .fillColor("black")
      .text(`Producto: ${detail.product.name}`);
    doc.fontSize(12).text(`Cantidad: ${detail.quantity}`);
    doc.fontSize(12).text(`Precio: ${detail.product.price}`);
    doc.moveDown(1);

    totalPrice += detail.total_price;
  });

  doc.fontSize(16).text(`Total: ${totalPrice}`, { align: "right" });

  doc.end();

  return filename;
}
