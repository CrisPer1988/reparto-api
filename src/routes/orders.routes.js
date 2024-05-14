const express = require("express");

const ordersController = require("../controllers/orders.controller");

const router = express.Router();

router
  .route("/")
  .post(ordersController.createOrder)
  .get(ordersController.getAllOrders);

router.post("/details", ordersController.createOrderDetails);

router.get("/:id", ordersController.getOneOrder);

module.exports = router;
