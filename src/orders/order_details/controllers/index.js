const Category = require("../../../products/category/model");
const Product = require("../../../products/model");
const Price = require("../../../products/price/model");
const Order = require("../../model");
const Order_Details = require("../model");
const Bonus = require("../../../products/bonus/model");
const { logger } = require("sequelize/lib/utils/logger");

exports.createOrderDeatails = async (req, res) => {
  try {
    const { order } = req;
    const details = req.body.details;

    if (!details || !Array.isArray(details)) {
      return res.status(400).json({ message: "Invalid details format" });
    }

    const orderDetails = [];

    for (const detail of details) {
      const { product_id, price_id, quantity } = detail;

      const product = await Product.findOne({
        where: { id: product_id },
        include: [{ model: Category }],
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

      if (quantity > product.stock) {
        return res.status(400).json({
          message: `Insufficient stock product ${product_id}`,
        });
      }

      const orderDetail = await Order_Details.create({
        product_id,
        price_id,
        quantity,
        order_id: order.id,
        total_price: price.price * quantity,
      });

      // const bonus = await Bonus.findAll({
      //   where: { category_id: product.category.id },
      // });

      // if (orderDetail?.quantity >= bonus?.quantity) {
      //   orderDetails.push({ bonus: bonus });
      //   console.log(
      //     "onnnnnnn",
      //     bonus?.quantity,
      //     "orrrrrrr",
      //     orderDetail?.quantity
      //   );
      // } else {
      //   console.log("NOOOOOOO");
      // }

      const newStock = product.stock - quantity;

      await product.update({ stock: newStock });

      orderDetails.push({
        product: product,
        total_price: orderDetail.total_price,
      });
    }

    return res.status(201).json({ orderDetails });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
