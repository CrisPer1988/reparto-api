const express = require("express");

const controllers = require("../controllers/");
const validationsOrder = require("../../../orders/middlewares");
const router = express.Router();

router
  .route("/:id")
  .post(validationsOrder.validExistsOrder, controllers.createOrderDeatails);

module.exports = router;
