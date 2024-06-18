// const { uploadImage } = require("../../utils/uploadImage");
const Category_Product = require("../model");

exports.createCategory = async (req, res) => {
  try {
    // const { distributor } = req;
    const { name } = req.body;

    // if (!req.file) {
    //   throw new Error("Image file is required");
    // }

    // const imageFile = req.file;

    // const imageUrl = await uploadImage(imageFile);

    const category = await Category_Product.create({
      name,
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
