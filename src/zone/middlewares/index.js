const Zone = require("../model");

exports.validExistsZone = async (req, res, next) => {
  try {
    const { id } = req.params;

    const zone = await Zone.findOne({
      where: {
        status: "active",
        id,
      },
    });

    if (!zone) {
      return res.status(404).json({ message: "Zone not found" });
    }

    req.zone = zone;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
