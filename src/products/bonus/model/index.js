const { DataTypes } = require("sequelize");
const { db } = require("../../../database/config");

const Bonus = db.define("bonuses", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  category_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category_bonus_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  bonus_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM("active", "disabled"),
    defaultValue: "active",
    allowNull: false,
  },
});

module.exports = Bonus;
