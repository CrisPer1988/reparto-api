const { createFunction } = require("../../utils/create.function");
const { loginFunction } = require("../../utils/loginFunction");
const Seller = require("../model/sellers.model");

exports.createSeller = async (req, res) => {
  try {
    const seller = await createFunction(req.body, Seller);

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

exports.loginSeller = async (req, res) => {
  try {
    const response = await loginFunction(req.body, Seller);

    if (response.error) {
      return res.status(400).json({
        status: "Error",
        message: response.message,
      });
    }

    const { user, token } = response;

    return res.status(201).json({
      status: "Success",
      seller: user,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

exports.allSeller = async (req, res) => {
  try {
    const sellers = await Seller.findAll();

    return res.status(200).json({
      status: "Success",
      sellers,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};
