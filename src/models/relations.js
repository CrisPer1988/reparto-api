// const Admin = require("../admin/model/admin.model");
const Seller = require("../sellers/model/sellers.model");
const Delivery_man = require("../delivery_man/model/delivery_man.model");
const Product = require("../products/model/product.model");
const Distributor = require("../distributor/model");
const Owner = require("../owner/model");
const Category_Product = require("../products/category_product/model");
const Price = require("../products/price/model");

const relations = () => {
  // owner => distributor
  Owner.hasMany(Distributor, { foreignKey: "owner_id" });
  Distributor.belongsTo(Owner, { foreignKey: "owner_id" });

  // superAdmin => sellers
  Distributor.hasMany(Seller, { foreignKey: "distributor_id" });
  Seller.belongsTo(Distributor, { foreignKey: "distributor_id" });

  // superAdmin => deleveries_men
  Distributor.hasMany(Delivery_man, { foreignKey: "distributor_id" });
  Delivery_man.belongsTo(Distributor, { foreignKey: "distributor_id" });

  // superAdmin => products
  Distributor.hasMany(Product, { foreignKey: "distributor_id" });
  Product.belongsTo(Distributor, { foreignKey: "distributor_id" });

  //category_product => product
  Category_Product.hasMany(Product, { foreignKey: "category_id" });
  Product.belongsTo(Category_Product, { foreignKey: "category_id" });

  //product => price
  Product.hasMany(Price, { foreignKey: "product_id" });
  Price.belongsTo(Product, { foreignKey: "product_id" });
};

module.exports = relations;
