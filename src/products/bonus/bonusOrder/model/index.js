const { DataTypes } = require("sequelize");
const { db } = require("../../../../database/config");

const BonusOrder = db.define("bonusOrder", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  order_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  bonus_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("active", "disabled"),
    defaultValue: "active",
    allowNull: false,
  },
});

module.exports = BonusOrder;
