const Order = require("../model");

exports.createOrder = async (req, res) => {
  try {
    const { commerce } = req;
    const { seller_id, zone_id } = req.body;

    console.log("NTREEE", commerce);

    if (seller_id && zone_id) {
      const order = await Order.create({
        seller_id,
        zone_id,
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
