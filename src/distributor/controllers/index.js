const Super_Admin = require("../model");
const bcrypt = require("bcryptjs");
const generateJWT = require("../../utils/jwt");
const Admin = require("../../admin/model/admin.model");
const Seller = require("../../sellers/model/sellers.model");
const Delivery_man = require("../../delivery_man/model/delivery_man.model");
const { createFunction } = require("../../utils/create.function");
const { uploadImage } = require("../../utils/uploadImage");
const Product = require("../../products/model");
const Distributor = require("../model");
const Owner = require("../../owner/model");

exports.createDistributor = async (req, res) => {
  try {
    const { owner } = req;
    const { name, address, email, phone, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const distributor = await Distributor.create({
      name,
      address,
      email,
      phone,
      password: encryptedPassword,
      owner_id: owner.id,
    });

    return res.status(201).json({
      status: "Success",
      distributor,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

exports.loginDistributor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const distributor = await Distributor.findOne({
      where: {
        email: email.toLowerCase(),
        status: "active",
      },
      include: [
        { model: Owner },
        { model: Seller },
        { model: Delivery_man },
        { model: Product },
      ],
    });

    if (!distributor) {
      return res.json({ message: "Distributor could not be found" });
    }

    if (!(await bcrypt.compare(password, distributor.password))) {
      return res.json({ message: "Incorrect email or password" });
    }

    const token = await generateJWT(distributor.id);

    return res.status(200).json({
      status: "success",
      token,
      distributor,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

exports.findDistributor = async (req, res) => {
  try {
    const { distributor } = req;

    return res.status(200).json({
      status: "Succes",
      distributor,
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

// exports.createDeliveryMan = async (req, res) => {
//   try {
//     const { superAdmin } = req;
//     const delevery = await createFunction(
//       req.body,
//       Delivery_man,
//       superAdmin.id
//     );

//     return res.status(201).json({
//       status: "Success",
//       delevery,
//     });
//   } catch (error) {
//     res.json({
//       message: error,
//     });
//   }
// };
