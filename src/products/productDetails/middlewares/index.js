const Product = require("../../model");
const ProductDetails = require("../model");

exports.validExistsProductDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const productDetail = await ProductDetails.findOne({
      where: { id, status: "active" },
      include: [{ model: Product }],
    });

    if (!productDetail) {
      return res.status(404).json({ message: "Flavor not found" });
    }

    console.log(productDetail);

    req.productDetail = productDetail;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
