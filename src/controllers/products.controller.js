const Product = require("../models/product.model");

exports.createProduct = async (req, res) => {
  try {
    const { name, price, grams } = req.body;

    const product = await Product.create({
      name,
      price,
      grams,
    });

    return res.status(201).json({
      status: "Success",
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        grams: product.grams,
      },
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ where: { status: "active" } });

    return res.status(201).json({
      status: "Success",
      products,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};
