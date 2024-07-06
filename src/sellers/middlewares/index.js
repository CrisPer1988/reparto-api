const Seller = require("../../sellers/model/sellers.model");

exports.validExistsSeller = async (req, res, next) => {
  try {
    const { id } = req.params;

    const seller = await Seller.findOne({
      where: {
        id,
        status: "active",
      },
    });

    if (!seller) {
      return res.status(404).json({ seller: "Seller not found" });
    }

    req.seller = seller;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
