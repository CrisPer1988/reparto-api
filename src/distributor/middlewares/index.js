const Delivery_man = require("../../delivery_man/model/delivery_man.model");
const Product = require("../../products/model");
const Seller = require("../../sellers/model/sellers.model");
const Distributor = require("../model");

exports.validExistsDistributor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const distributor = await Distributor.findOne({
      where: {
        id,
        status: "active",
      },
      include: [{ model: Seller }, { model: Delivery_man }, { model: Product }],
    });

    if (!distributor) {
      return res.status(404).json({ message: "Distributor not found" });
    }

    req.distributor = distributor;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
