const Super_Admin = require("../super_admin/model/super_admin.model");
const Admin = require("../admin/model/admin.model");
const Seller = require("../sellers/model/sellers.model");
const Delivery_man = require("../delivery_man/model/delivery_man.model");

const relations = () => {
  // superAdmin => admins
  Super_Admin.hasMany(Admin, { foreignKey: "super_admin_id" });
  Admin.belongsTo(Super_Admin, { foreignKey: "super_admin_id" });

  // superAdmin => sellers
  Super_Admin.hasMany(Seller, { foreignKey: "super_admin_id" });
  Seller.belongsTo(Super_Admin, { foreignKey: "super_admin_id" });

  // superAdmin => deleveries_men
  Super_Admin.hasMany(Delivery_man, { foreignKey: "super_admin_id" });
  Delivery_man.belongsTo(Super_Admin, { foreignKey: "super_admin_id" });
};

module.exports = relations;
