const { uploadImage } = require("../../utils/uploadImage");
const Product = require("../model/product.model");

exports.createProduct = async (req, res) => {
  try {
    // const { distributor } = req;
    const { category, type, quantity, stock } = req.body;

    if (!req.file) {
      throw new Error("Image file is required");
    }

    const imageFile = req.file;

    const imageUrl = await uploadImage(imageFile);

    const product = await Product.create({
      category,
      type,
      quantity,
      stock,
      image: imageUrl,
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
