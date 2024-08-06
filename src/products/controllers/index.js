const Product = require("../model");
const Price = require("../price/model");
const ProductDetails = require("../productDetails/model");

exports.createProduct = async (req, res) => {
  try {
    const { name, quantity, pack } = req.body;

    const product = await Product.create({
      name,
      quantity,
      pack,
    });

    return res.status(201).json({
      status: "Success",
      product,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.allProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { status: "active" },
      include: [
        {
          model: Price,
          where: {
            status: "active",
          },
        },
        {
          model: ProductDetails,
          where: {
            status: "active",
          },
        },
      ],
    });

    return res.status(201).json({
      status: "Success",
      products,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
