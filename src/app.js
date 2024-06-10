const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cors());

const superAdminRouter = require("./super_admin/routes/super_admin.routes");

app.use("/super", superAdminRouter);

module.exports = app;
