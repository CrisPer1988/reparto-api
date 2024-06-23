const { uploadImage } = require("../../utils/uploadImage");
const Product = require("../model/product.model");
const Price = require("../price/model");
const Type = require("../type/model");

exports.createProduct = async (req, res) => {
  try {
    const { name, quantity, stock, type, pack } = req.body;

    if (!req.file) {
      throw new Error("Image file is required");
    }

    const imageFile = req.file;

    const imageUrl = await uploadImage(imageFile);

    const product = await Product.create({
      name,
      quantity,
      pack,
      image: imageUrl,
    });

    const type_product = await Type.create({
      name: type,
      stock,
      product_id: product.id,
    });

    return res.status(201).json({
      status: "Success",
      product,
      type_product,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

exports.allProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { status: "active" },
      include: [{ model: Type }, { model: Price }],
    });

    return res.status(200).json({
      status: "Success",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
