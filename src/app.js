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
const productsRouter = require("./products/routes");
const sellersRouter = require("./sellers/routes");
const deliveriesManRouter = require("./delivery_man/routes");
const categoriesRouter = require("./products/category_product/routes");
const typesRouter = require("./products/type_product/routes");

app.use("/owner", ownerRouter);
app.use("/distributor", distributorRouter);
app.use("/categories", categoriesRouter);
app.use("/types", typesRouter);
app.use("/products", productsRouter);
app.use("/sellers", sellersRouter);
app.use("/deliveries", deliveriesManRouter);

module.exports = app;
