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
const orderRouter = require("./routes/orders.routes");
const superAdminRouter = require("./routes/super_admin.routes");

app.use("/users", userRouter);
app.use("/super", superAdminRouter);
app.use("/commerces", commerceRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/downloads", express.static(path.join("downloads")));

module.exports = app;
