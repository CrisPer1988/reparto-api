const Price = require("../model");

exports.createPrice = async (req, res) => {
  try {
    const { product } = req;
    const { name, price } = req.body;

    const priceProduct = await Price.create({
      name,
      price,
      product_id: product.id,
    });

    return res.status(201).json({
      status: "Success",
      priceProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
