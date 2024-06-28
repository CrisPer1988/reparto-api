const Commerce = require("../model");

exports.createCommerce = async (req, res) => {
  try {
    const { name, zone_id, address, phone } = req.body;

    const commerce = await Commerce.create({
      name,
      address,
      zone_id,
      phone,
    });

    return res.status(201).json({
      status: "Success",
      commerce,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};
