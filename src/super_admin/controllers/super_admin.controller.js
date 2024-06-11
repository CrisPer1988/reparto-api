const Super_Admin = require("../model/super_admin.model");
const bcrypt = require("bcryptjs");
const generateJWT = require("../../utils/jwt");
const Admin = require("../../admin/model/admin.model");
const Seller = require("../../sellers/model/sellers.model");
const Delivery_man = require("../../delivery_man/model/delivery_man.model");
const { createFunction } = require("../../utils/create.function");
const { uploadImage } = require("../../utils/uploadImage");
const Product = require("../../products/model/product.model");

exports.createSuperAdmin = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const superAdmin = await Super_Admin.create({
      firstname,
      lastname,
      email,
      password: encryptedPassword,
    });

    return res.status(201).json({
      status: "Success",
      superAdmin,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

exports.loginSuperAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const superAdmin = await Super_Admin.findOne({
      where: {
        email: email.toLowerCase(),
        status: "active",
      },
    });

    if (!superAdmin) {
      return res.json({ message: "The user could not be found" });
    }

    if (!(await bcrypt.compare(password, superAdmin.password))) {
      return res.json({ message: "Incorrect email or password" });
    }

    const token = await generateJWT(superAdmin.id);

    return res.status(200).json({
      status: "success",
      token,
      superAdmin: {
        id: superAdmin.id,
        firstname: superAdmin.firstname,
        lastname: superAdmin.lastname,
        email: superAdmin.email,
      },
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

exports.findSuperAdmin = async (req, res) => {
  try {
    console.log("ENTREEEE");
    const { superAdmin } = req;

    return res.status(200).json({
      status: "Succes",
      superAdmin,
    });
  } catch (error) {}
};

exports.createAdmin = async (req, res) => {
  try {
    const { superAdmin } = req;
    const admin = await createFunction(req.body, Admin, superAdmin.id);

    return res.status(201).json({
      status: "Success",
      admin,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

exports.createSeller = async (req, res) => {
  try {
    const { superAdmin } = req;
    const seller = await createFunction(req.body, Seller, superAdmin.id);

    return res.status(201).json({
      status: "Success",
      seller,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

exports.createDeliveryMan = async (req, res) => {
  try {
    const { superAdmin } = req;
    const delevery = await createFunction(
      req.body,
      Delivery_man,
      superAdmin.id
    );

    return res.status(201).json({
      status: "Success",
      delevery,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { superAdmin } = req;
    const { name, price } = req.body;

    if (!req.file) {
      throw new Error("Image file is required");
    }

    const imageFile = req.file;

    const imageUrl = await uploadImage(imageFile);

    const product = await Product.create({
      name,
      image: imageUrl,
      price,
      super_admin_id: superAdmin.id,
    });
    return res.status(201).json({
      status: "Success",
      product,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};
