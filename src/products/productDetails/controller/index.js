const { uploadImage } = require("../../../utils/uploadImage");
const ProductDetails = require("../model");

exports.createProductDetails = async (req, res) => {
  try {
    const { product } = req;
    const { flavor, stock } = req.body;

    if (!req.file) {
      throw new Error("Image file is required");
    }

    const imageFile = req.file;

    const imageUrl = await uploadImage(imageFile);

    const productDetails = await ProductDetails.create({
      flavor,
      stock,
      image: imageUrl,
      product_id: product.id,
    });

    return res.status(201).json({
      status: "Success",
      productDetails,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};
