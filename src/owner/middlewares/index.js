const Owner = require("../../owner/model");
const Distributor = require("../model");

exports.validExistsOwner = async (req, res, next) => {
  try {
    const { id } = req.params;

    const owner = await Owner.findOne({
      where: {
        id,
        status: "active",
      },
      // include: [{ model: Distributor }],
    });

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    req.owner = owner;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
