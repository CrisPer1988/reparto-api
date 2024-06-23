const { DataTypes } = require("sequelize");
const { db } = require("../../database/config");

const Product = db.define("products", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pack: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  // distributor_id: {
  //   type: DataTypes.UUID,
  //   allowNull: false,
  // },
  // category_id: {
  //   type: DataTypes.UUID,
  //   allowNull: false,
  // },
  status: {
    type: DataTypes.ENUM("active", "disabled"),
    defaultValue: "active",
    allowNull: false,
  },
});

module.exports = Product;
