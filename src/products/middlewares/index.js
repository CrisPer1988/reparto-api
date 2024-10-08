const Product = require("../model");

exports.validExistsProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("IDDDDDDD", id);

    const product = await Product.findOne({
      where: {
        id,
        status: "active",
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    req.product = product;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
