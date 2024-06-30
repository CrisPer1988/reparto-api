const express = require("express");

const controllers = require("../controllers");
const validationsCommerce = require("../../commerce/middlewares");
const router = express.Router();

router
  .route("/:id")
  .post(validationsCommerce.validExistsCommerce, controllers.createOrder);

module.exports = router;
