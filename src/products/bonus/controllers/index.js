const Category_Product = require("../../category_product/model");
const Product = require("../../model/product.model");
const Bonus = require("../model");

exports.createBonus = async (req, res) => {
  try {
    const { product_id, product_bonus_id, quantity, bonus_quantity } = req.body;

    const bonus = await Bonus.create({
      product_bonus_id,
      quantity,
      bonus_quantity,
      product_id,
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
        { model: Product, as: "Product" },
        { model: Product, as: "BonusProduct" },
      ],
    });

    return res.status(201).json({
      status: "Success",
      bonuses,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
