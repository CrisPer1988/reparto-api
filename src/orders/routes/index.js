const express = require("express");

const controllers = require("../controllers");
const validationsCommerce = require("../../commerce/middlewares");
const validationsZone = require("../../zone/middlewares");
const router = express.Router();

router.route("/").post(controllers.totalPurchasesByDateRange);

router
  .route("/:id")
  .post(validationsCommerce.validExistsCommerce, controllers.createOrder);

router
  .route("/get/:id")

  .post(validationsZone.validExistsZone, controllers.allOrdersByZone);
module.exports = router;
