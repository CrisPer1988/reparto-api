// const Commerce = require("./commerce.model");
// const Order = require("./order.model");
// const OrderDetails = require("./orderDetails.model");
// const Product = require("./product.model");
// const User = require("./users.model");

const relations = () => {
  // Order.hasMany(OrderDetails, { foreignKey: "order_id" });
  // OrderDetails.belongsTo(Order, { foreignKey: "order_id" });
  // Commerce.hasMany(Order, { foreignKey: "commerce_id" });
  // Order.belongsTo(Commerce, { foreignKey: "commerce_id" });
  // Product.hasMany(OrderDetails, { foreignKey: "product_id" });
  // OrderDetails.belongsTo(Product, { foreignKey: "product_id" });
  // User.hasMany(Order, { foreignKey: "user_id" });
  // Order.belongsTo(User, { foreignKey: "user_id" });
};

module.exports = relations;
