// const Category = require("../../../products/category/model");
const Product = require("../../../products/model");
const Price = require("../../../products/price/model");
const Order = require("../../model");
const Order_Details = require("../model");
const Bonus = require("../../../products/bonus/model");

const { Op } = require("sequelize");
const ProductDetails = require("../../../products/productDetails/model");

exports.createOrderDetails = async (req, res) => {
  try {
    const { order } = req;
    const details = req.body.details;

    if (!details || !Array.isArray(details)) {
      return res.status(400).json({ message: "Invalid details format" });
    }

    const orderDetails = [];
    const bonification = {};
    const applicableBonuses = [];

    for (const detail of details) {
      const { product_id, price_id, quantity, product_detail_id } = detail;

      const product = await Product.findOne({
        where: { id: product_id },
        include: [{ model: ProductDetails }],
      });

      const productDetails = await ProductDetails.findOne({
        where: { id: product_detail_id },
      });

      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with id ${product_id} not found` });
      }

      const price = await Price.findOne({ where: { id: price_id } });

      if (!price) {
        return res
          .status(404)
          .json({ message: `Price with id ${price_id} not found` });
      }

      if (quantity > productDetails.stock) {
        return res.status(200).json({
          status: "Failed",
          message: `Stock insuficiente de: ${productDetails.flavor}, solo quedan: ${productDetails.stock}`,
        });
      }

      const orderDetail = await Order_Details.create({
        product_id,
        price_id,
        product_detail_id,
        quantity,
        order_id: order.id,
        total_price: price.price * quantity,
      });

      const productName = product.name;

      if (bonification[productName]) {
        bonification[productName] += quantity;
      } else {
        bonification[productName] = quantity;
      }

      const bonus = await Bonus.findOne({
        where: {
          product_id: product.id,
          quantity: {
            [Op.lte]: bonification[productName],
          },
        },
        include: [{ model: Product, as: "BonusProduct" }],
      });

      console.log("BONUSSSSSSSSSS", bonus);

      if (bonus) {
        applicableBonuses.push(bonus);
        console.log(
          `BONUS encontrado para la categoría ${productName}:`,
          bonus
        );
      }

      const newStock = productDetails.stock - quantity;
      await productDetails.update({ stock: newStock });

      orderDetails.push({
        product,
        productDetails,
        total_price: orderDetail.total_price,
      });
    }

    return res.status(201).json({ orderDetails, applicableBonuses });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
