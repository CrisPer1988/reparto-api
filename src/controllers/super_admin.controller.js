const Super_Admin = require("../models/super_admin.model");
const bcrypt = require("bcryptjs");
const generateJWT = require("../utils/jwt");

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
  } catch (error) {}
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
