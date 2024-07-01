const Order = require("../model");

exports.validExistsOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      where: {
        id,
        status: "pending",
      },
    });

    if (!order) {
      return res.status(404).json({ order: "Order not found" });
    }

    req.order = order;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
