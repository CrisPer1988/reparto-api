const Zone = require("../model");

exports.createZone = async (req, res) => {
  try {
    const { name, seller_id, delivery_man_id } = req.body;

    const zone = await Zone.create({
      name,
      seller_id,
      delivery_man_id,
    });

    return res.status(201).json({
      status: "Success",
      zone,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.updateZone = async (req, res) => {
  try {
    const { zone } = req;
    const { seller_id, delivery_man_id, name } = req.body;

    await zone.update({
      seller_id: seller_id || zone.seller_id,
      delivery_man_id: delivery_man_id || zone.delivery_man_id,
      name: name || zone.name,
    });

    return res.status(201).json({
      status: "Success",
      zone,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
