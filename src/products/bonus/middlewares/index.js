const Bonus = require("../model");

exports.validExistBonus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const bonus = await Bonus.findOne({ where: { id, status: "active" } });

    if (!bonus) {
      return res.status(404).json({ message: "Bonus not found" });
    }

    req.bonus = bonus;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
