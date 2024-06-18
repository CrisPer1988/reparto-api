const { createFunction } = require("../../utils/create.function");
const Delivery_man = require("../model/delivery_man.model");

exports.createDeliveryMan = async (req, res) => {
  try {
    const { distributor } = req;
    const delevery = await createFunction(
      req.body,
      Delivery_man,
      distributor.id
    );

    return res.status(201).json({
      status: "Success",
      delevery,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};
