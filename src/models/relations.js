// const Admin = require("../admin/model/admin.model");
const Seller = require("../sellers/model/sellers.model");
const Delivery_man = require("../delivery_man/model/delivery_man.model");
const Product = require("../products/model");
const Distributor = require("../distributor/model");
const Owner = require("../owner/model");
// const Category_Product = require("../products/type/model");
const Price = require("../products/price/model");
const Bonus = require("../products/bonus/model");
const Category = require("../products/category/model");

const relations = () => {
  // owner => distributor
  Owner.hasMany(Distributor, { foreignKey: "owner_id" });
  Distributor.belongsTo(Owner, { foreignKey: "owner_id" });

  // superAdmin => sellers
  // Distributor.hasMany(Seller, { foreignKey: "distributor_id" });
  // Seller.belongsTo(Distributor, { foreignKey: "distributor_id" });

  // superAdmin => deleveries_men
  // Distributor.hasMany(Delivery_man, { foreignKey: "distributor_id" });
  // Delivery_man.belongsTo(Distributor, { foreignKey: "distributor_id" });

  // superAdmin => products
  // Distributor.hasMany(Product, { foreignKey: "distributor_id" });
  // Product.belongsTo(Distributor, { foreignKey: "distributor_id" });

  //product => price
  Product.hasMany(Price, { foreignKey: "product_id" });
  Price.belongsTo(Product, { foreignKey: "product_id" });

  Category.hasMany(Product, { foreignKey: "category_id" });
  Product.belongsTo(Category, { foreignKey: "category_id" });

  // category => bonus
  Category.hasMany(Bonus, { foreignKey: "category_id", as: "CategoryBonuses" });
  Bonus.belongsTo(Category, {
    foreignKey: "category_id",
    as: "Category",
  });

  // category_bonus => bonus
  Category.hasMany(Bonus, {
    foreignKey: "category_bonus_id",
    as: "BonusCategories",
  });
  Bonus.belongsTo(Category, {
    foreignKey: "category_bonus_id",
    as: "BonusCategory",
  });

  //product  => type
  // Product.hasMany(Type, { foreignKey: "product_id" });
  // Type.belongsTo(Product, { foreignKey: "product_id" });
};

module.exports = relations;
