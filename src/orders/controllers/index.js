const Order = require("../model");
const Order_Details = require("../order_details/model");

exports.createOrder = async (req, res) => {
  try {
    const { commerce } = req;
    const { seller_id, zone_id } = req.body;

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

exports.allOrdersByZone = async (req, res) => {
  const { zone } = req;

  const orders = await Order.findAll({
    where: {
      zone_id: zone.id,
    },
    include: [{ model: Order_Details }],
  });

  return res.json({
    orders,
  });
};
