const { uploadImage } = require("../../utils/uploadImage");
const Category = require("../category/model");
const Product = require("../model");
const Price = require("../price/model");

exports.createProduct = async (req, res) => {
  try {
    const { category } = req;
    const { flavor, stock } = req.body;

    if (!req.file) {
      throw new Error("Image file is required");
    }

    const imageFile = req.file;

    const imageUrl = await uploadImage(imageFile);

    const product = await Product.create({
      flavor,
      stock,
      image: imageUrl,
      category_id: category.id,
    });

    return res.status(201).json({
      status: "Success",
      product,
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
      include: [{ model: Category }, { model: Price }],
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
