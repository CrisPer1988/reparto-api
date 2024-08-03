const express = require("express");

const controllers = require("../controllers");
const validationsCommerce = require("../../commerce/middlewares");
const validationsOrder = require("../middlewares");
const validationsZone = require("../../zone/middlewares");
const router = express.Router();

router.route("/").post(controllers.totalSalesByDateRange);
router.route("/completed").post(controllers.totalSalesByDateRangeCompleted);
router.route("/pending").get(controllers.totalOrdersPending);

router
  .route("/:id/completed")
  .post(validationsOrder.validExistsOrder, controllers.completedOrder);

router
  .route("/:id")
  .post(validationsCommerce.validExistsCommerce, controllers.createOrder);

router
  .route("/get/:id")

  .post(validationsZone.validExistsZone, controllers.allOrdersByZone);
module.exports = router;
