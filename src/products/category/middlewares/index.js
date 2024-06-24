const Category = require("../../category/model");

exports.validExistCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findOne({
      where: { id, status: "active" },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    req.category = category;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
