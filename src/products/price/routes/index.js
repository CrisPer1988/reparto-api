const express = require("express");

const controllers = require("../controllers");
const productsValidations = require("../../../products/middlewares");
const pricesValidations = require("../../../products/price/middlewares");
const router = express.Router();

router
  .route("/:id")
  .post(productsValidations.validExistsProduct, controllers.createPrice);

router
  .route("/price/:id")
  .patch(pricesValidations.validExistsPrice, controllers.updatedPrice);

module.exports = router;
