const { DataTypes } = require("sequelize");
const { db } = require("../../../database/config");

const Category_Product = db.define("categories_products", {
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
  pack: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  distributor_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("active", "disabled"),
    defaultValue: "active",
    allowNull: false,
  },
});

module.exports = Category_Product;
