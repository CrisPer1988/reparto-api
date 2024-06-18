const Type_Product = require("../model");

exports.createType = async (req, res) => {
  try {
    const { category } = req;
    const { name, quantity } = req.body;

    const product = await Type_Product.create({
      name,
      category_id: category.id,
      quantity,
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
