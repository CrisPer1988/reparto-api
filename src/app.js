const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cors());

const userRouter = require("./routes/users.routes");
const commerceRouter = require("./routes/commerce.routes");
const productRouter = require("./routes/products.routes");
const OrderRouter = require("./routes/orders.routes");

app.use("/api/v1/users", userRouter);
app.use("/api/v1/commerces", commerceRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", OrderRouter);
app.use("/downloads", express.static(path.join(__dirname, "downloads")));

module.exports = app;