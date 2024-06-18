const bcrypt = require("bcryptjs");

exports.createFunction = async (body, Model, distributor_id) => {
  const { firstname, lastname, email, password } = body;

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const deliveryMan = await Model.create({
    firstname,
    lastname,
    email,
    password: encryptedPassword,
    distributor_id,
  });

  return deliveryMan;
};
