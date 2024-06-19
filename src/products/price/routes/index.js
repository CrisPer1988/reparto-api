const express = require("express");

const priceController = require("../controllers");
const productsValidations = require("../../../products/middlewares");
const router = express.Router();

router
  .route("/:id")
  .post(productsValidations.validExistsProduct, priceController.createPrice);

module.exports = router;
