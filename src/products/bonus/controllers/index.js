// const Category = require("../../category/model");
const Product = require("../../model");
const ProductDetails = require("../../productDetails/model");
const Bonus = require("../model");

exports.createBonus = async (req, res) => {
  try {
    const {
      product_bonus_id,
      product_id,
      quantity,
      bonus_quantity,
      product_detail_bonus_id,
    } = req.body;

    const bonus = await Bonus.create({
      product_bonus_id,
      product_id,
      quantity,
      bonus_quantity,
      product_detail_bonus_id,
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
      where: { status: "active" },
      include: [
        { model: Product, as: "Product" },
        {
          model: Product,
          as: "BonusProduct",
        },
        { model: ProductDetails },
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

exports.updatedBonus = async (req, res) => {
  const { bonus } = req;
  const { quantity, product_detail_bonus_id } = req.body;

  await bonus.update({
    quantity: quantity || bonus.quantity,
    product_detail_bonus_id:
      product_detail_bonus_id || bonus.product_detail_bonus_id,
  });

  return res.status(200).json({
    status: "Success",
  });
};

exports.deleteBonus = async (req, res) => {
  const { bonus } = req;

  await bonus.update({ status: "disabled" });

  return res.status(200).json({
    status: "Success",
  });
};
