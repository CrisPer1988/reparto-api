const { DataTypes } = require("sequelize");
const { db } = require("../../database/config");

const Zone = db.define("zones", {
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
  seller_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  delivery_man_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("active", "disabled"),
    defaultValue: "active",
    allowNull: false,
  },
});

module.exports = Zone;
