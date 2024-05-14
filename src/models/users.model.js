const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const User = db.define("users", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("admin", "employee"),
    defaultValue: "employee",
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("active", "disable"),
    defaultValue: "active",
    allowNull: false,
  },
});

module.exports = User;
