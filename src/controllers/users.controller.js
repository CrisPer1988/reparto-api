const User = require("../models/users.model");
const bcrypt = require("bcryptjs");
const generateJWT = require("../utils/jwt");

exports.createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      first_name,
      last_name,
      email,
      password: encryptedPassword,
      role,
    });

    return res.status(201).json({
      status: "Success",
      user,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email.toLowerCase(),
        status: "active",
      },
    });

    if (!user) {
      return res.json({ message: "The user could not be found" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.json({ message: "Incorrect email or password" });
    }

    const token = await generateJWT(user.id);

    return res.status(200).json({
      status: "success",
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};
