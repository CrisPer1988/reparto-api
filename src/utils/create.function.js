const bcrypt = require("bcryptjs");

exports.createFunction = async (body, Model, super_admin_id) => {
  console.log("ENTREEEEE");
  const { firstname, lastname, email, password } = body;

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const deliveryMan = await Model.create({
    firstname,
    lastname,
    email,
    password: encryptedPassword,
    super_admin_id,
  });
  console.log("finalizado", deliveryMan);
  return deliveryMan;
};
