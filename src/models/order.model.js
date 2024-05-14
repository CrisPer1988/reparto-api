const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const Order = db.define("orders", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  commerce_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  other: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("active", "disabled"),
    defaultValue: "active",
    allowNull: false,
  },
});

module.exports = Order;
