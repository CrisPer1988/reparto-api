const bcrypt = require("bcryptjs");
const generateJWT = require("./jwt");

exports.loginFunction = async (body, Model) => {
  try {
    const { email, password } = body;

    const user = await Model.findOne({
      where: {
        email: email.toLowerCase(),
        status: "active",
      },
    });

    if (!user) {
      return { error: true, message: "User could not be found" };
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return { error: true, message: "Incorrect email or password" };
    }

    const token = await generateJWT(user.id);

    return { error: false, token, user };
  } catch (error) {
    return { error: true, message: error.message };
  }
};
