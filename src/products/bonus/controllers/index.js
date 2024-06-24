const Category = require("../../category/model");
const Product = require("../../model");
const Bonus = require("../model");

exports.createBonus = async (req, res) => {
  try {
    const { category_bonus_id, category_id, quantity, bonus_quantity } =
      req.body;

    const bonus = await Bonus.create({
      category_bonus_id,
      category_id,
      quantity,
      bonus_quantity,
    });

    return res.status(201).json({
      status: "Success",
      bonus,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.allBunuses = async (req, res) => {
  try {
    const bonuses = await Bonus.findAll({
      include: [
        { model: Category, as: "Category" },
        { model: Category, as: "BonusCategory" },
      ],
    });

    return res.status(200).json({
      status: "Success",
      bonuses,
    });
  } catch (error) {
    console.error("Error fetching bonuses:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
