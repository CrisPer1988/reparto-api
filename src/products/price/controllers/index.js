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

exports.updatedPrice = async (req, res) => {
  try {
    const { price } = req;
    const { name, newPrice } = req.body;

    const priceUpdated = await price.update({
      price: newPrice || price.price,
      name: name || price.name,
    });

    return res.status(201).json({
      status: "Success",
      priceUpdated,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.deletePrice = async (req, res) => {
  try {
    const { price } = req;

    await price.update({
      status: "disabled",
    });

    return res.status(201).json({
      status: "Success",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
