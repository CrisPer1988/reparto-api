const Owner = require("../model");
const bcrypt = require("bcryptjs");

exports.createOwner = async (req, res) => {
  try {
    console.log("ENTREEEEEEEE");
    const { firstname, lastname, email, password } = req.body;
    console.log("ENTREEEEEEEE", req.body);

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const owner = await Owner.create({
      firstname,
      lastname,
      email,
      password: encryptedPassword,
    });

    return res.status(201).json({
      status: "Success",
      owner,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
