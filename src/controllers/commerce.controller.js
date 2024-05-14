const Commerce = require("../models/commerce.model");

exports.createCommerce = async (req, res) => {
  const { name, address, phone } = req.body;

  const commerce = await Commerce.create({
    name,
    address,
    phone,
  });

  return res.status(201).json({
    status: "Success",
    commerce,
  });
};

exports.getAllCommerces = async (req, res) => {
  const commerces = await Commerce.findAll();

  return res.status(200).json({
    status: "Success",
    commerces,
  });
};
