const Commerce = require("../model");

exports.validExistsCommerce = async (req, res, next) => {
  try {
    const { id } = req.params;

    const commerce = await Commerce.findOne({
      where: {
        id,
        status: "active",
      },
    });

    if (!commerce) {
      return res.status(404).json({ commerce: "Commerce not found" });
    }

    req.commerce = commerce;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
