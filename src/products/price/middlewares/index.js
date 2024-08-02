const Price = require("../model");

exports.validExistsPrice = async (req, res, next) => {
  try {
    const { id } = req.params;

    const price = await Price.findOne({
      where: {
        id,
        status: "active",
      },
    });

    if (!price) {
      return res.status(404).json({ message: "price not found" });
    }

    req.price = price;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
