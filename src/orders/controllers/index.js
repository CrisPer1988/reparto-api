const Commerce = require("../../commerce/model");
const Category = require("../../products/category/model");
const Product = require("../../products/model");
const Order = require("../model");
const Order_Details = require("../order_details/model");
const { Op } = require("sequelize");

exports.createOrder = async (req, res) => {
  try {
    const { commerce } = req;
    const { seller_id, zone_id, create } = req.body;

    if (seller_id && zone_id) {
      const order = await Order.create({
        seller_id,
        zone_id,
        create,
        commerce_id: commerce.id,
      });

      return res.status(201).json({
        status: "Success",
        order,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.allOrdersByZone = async (req, res) => {
  try {
    const { zone } = req;
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const selectedDate = new Date(date);
    const startOfDay = new Date(selectedDate);
    const endOfDay = new Date(selectedDate);

    startOfDay.setUTCHours(0, 0, 0, 0);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const orders = await Order.findAll({
      where: {
        zone_id: zone.id,
        create: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
      include: [
        {
          model: Order_Details,
          include: [{ model: Product, include: [{ model: Category }] }],
        },
        { model: Commerce },
      ],
    });

    return res.json({
      orders,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
