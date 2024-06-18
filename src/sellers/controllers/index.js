const { createFunction } = require("../../utils/create.function");
const Seller = require("../model/sellers.model");

exports.createSeller = async (req, res) => {
  try {
    const { distributor } = req;

    const seller = await createFunction(req.body, Seller, distributor.id);

    return res.status(201).json({
      status: "Success",
      seller,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};
