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
          required: false,
        },
        {
          model: ProductDetails,
          where: {
            status: "active",
          },
          required: false,
        },
      ],
      order: [
        ["createdAt", "ASC"],
        [ProductDetails, "createdAt", "ASC"],
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

exports.updatedProduct = async (req, res) => {
  try {
    const { product } = req;
    const { name, quantity, pack } = req.body;

    console.log("PRODUCTTTT", product);

    await product.update({
      name: name || product.name,
      quantity: quantity || product.quantity,
      pack: pack || product.pack,
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
