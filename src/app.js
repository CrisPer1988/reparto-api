const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cors());

const ownerRouter = require("./owner/routes");
const distributorRouter = require("./distributor/routes");
const productDetailsRouter = require("./products/productDetails/routes");
const sellersRouter = require("./sellers/routes");
const productsRouter = require("./products/routes");
const priceRouter = require("./products/price/routes");
const zoneRouter = require("./zone/routes");
const bonusRouter = require("./products/bonus/routes");
const commercesRouter = require("./commerce/routes");
const ordersRouter = require("./orders/routes");
const ordersDetailsRouter = require("./orders/order_details/routes");

app.use("/owner", ownerRouter);
app.use("/distributor", distributorRouter);
app.use("/products", productsRouter);
app.use("/price", priceRouter);
app.use("/product-details", productDetailsRouter);
app.use("/sellers", sellersRouter);
app.use("/zone", zoneRouter);
app.use("/bonus", bonusRouter);
app.use("/bonus", bonusRouter);
app.use("/commerces", commercesRouter);
app.use("/orders", ordersRouter);
app.use("/order-details", ordersDetailsRouter);

module.exports = app;
