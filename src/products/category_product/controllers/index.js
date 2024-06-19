const Product = require("../../model/product.model");
const Price = require("../../price/model");
const Category_Product = require("../model");

exports.createCategory = async (req, res) => {
  try {
    const { distributor } = req;
    const { name, pack } = req.body;

    const category = await Category_Product.create({
      name,
      pack,
      distributor_id: distributor.id,
    });
    return res.status(201).json({
      status: "Success",
      category,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

exports.allCategories = async (req, res) => {
  try {
    const { distributor } = req;
    const categories = await Category_Product.findAll({
      where: { status: "active", distributor_id: distributor.id },
      include: [{ model: Product, include: [{ model: Price }] }],
    });

    return res.status(201).json({
      status: "Success",
      categories,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};
