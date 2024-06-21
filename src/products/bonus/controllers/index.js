const Bonus = require("../model");

exports.createBonus = async (req, res) => {
  try {
    const { product } = req;
    const { product_bonus_id, quantity, bonus_quantity } = req.body;

    const bonus = await Bonus.create({
      product_bonus_id,
      quantity,
      bonus_quantity,
      product_id: product.id,
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
