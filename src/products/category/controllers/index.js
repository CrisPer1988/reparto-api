const Category = require("../model");

exports.createCategory = async (req, res) => {
  try {
    const { name, quantity, pack } = req.body;

    const category = await Category.create({
      name,
      quantity,
      pack,
    });

    return res.status(201).json({
      status: "Success",
      category,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
