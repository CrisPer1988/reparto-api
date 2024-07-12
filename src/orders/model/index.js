const { DataTypes } = require("sequelize");
const { db } = require("../../database/config");

const Order = db.define("orders", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  seller_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  zone_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  create: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  commerce_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "rejected", "completed"),
    defaultValue: "pending",
    allowNull: false,
  },
});

module.exports = Order;
