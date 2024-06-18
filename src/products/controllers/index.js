const { uploadImage } = require("../../utils/uploadImage");
const Product = require("../model/product.model");

exports.createProduct = async (req, res) => {
  try {
    const { distributor } = req;
    const { name, category_id } = req.body;

    if (!req.file) {
      throw new Error("Image file is required");
    }

    const imageFile = req.file;

    const imageUrl = await uploadImage(imageFile);

    const product = await Product.create({
      name,
      image: imageUrl,
      distributor_id: distributor.id,
      category_id,
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
