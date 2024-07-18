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
const Order_Details = require("../orders/order_details/model");
const Order = require("../orders/model");
const Commerce = require("../commerce/model");
const Zone = require("../zone/model");
const ProductDetails = require("../products/productDetails/model");

const relations = () => {
  // owner => distributor
  Owner.hasMany(Distributor, { foreignKey: "owner_id" });
  Distributor.belongsTo(Owner, { foreignKey: "owner_id" });

  //product => price
  Product.hasMany(Price, { foreignKey: "product_id" });
  Price.belongsTo(Product, { foreignKey: "product_id" });

  //product => productDetails
  Product.hasMany(ProductDetails, { foreignKey: "product_id" });
  ProductDetails.belongsTo(Product, { foreignKey: "product_id" });

  //product => order_details
  Product.hasMany(Order_Details, { foreignKey: "product_id" });
  Order_Details.belongsTo(Product, { foreignKey: "product_id" });

  // product => bonus
  Product.hasMany(Bonus, { foreignKey: "product_id", as: "ProductBonuses" });
  Bonus.belongsTo(Product, {
    foreignKey: "product_id",
    as: "Product",
  });

  // product_bonus => bonus
  Product.hasMany(Bonus, {
    foreignKey: "product_bonus_id",
    as: "BonusProduct",
  });
  Bonus.belongsTo(Product, {
    foreignKey: "product_bonus_id",
    as: "BonusProduct",
  });

  //order => order_details
  Order.hasMany(Order_Details, { foreignKey: "order_id" });
  Order_Details.belongsTo(Order, { foreignKey: "order_id" });

  //prudct => order_details
  Product.hasMany(Order_Details, { foreignKey: "product_id" });
  Order_Details.belongsTo(Product, { foreignKey: "product_id" });

  //commerce => order
  Commerce.hasMany(Order, { foreignKey: "commerce_id" });
  Order.belongsTo(Commerce, { foreignKey: "commerce_id" });

  //seller => order
  Seller.hasMany(Order, { foreignKey: "seller_id" });
  Order.belongsTo(Seller, { foreignKey: "seller_id" });

  //seller => zone
  Seller.hasMany(Zone, { foreignKey: "seller_id" });
  Zone.belongsTo(Seller, { foreignKey: "seller_id" });
};

module.exports = relations;
