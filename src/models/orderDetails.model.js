const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const OrderDetails = db.define("ordersDetails", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // other: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  // },
  status: {
    type: DataTypes.ENUM("active", "disabled"),
    defaultValue: "active",
    allowNull: false,
  },
});

module.exports = OrderDetails;
