const express = require("express");

const commerceController = require("../controllers/commerce.controller");

const router = express.Router();

router
  .route("/")
  .post(commerceController.createCommerce)
  .get(commerceController.getAllCommerces);

module.exports = router;
