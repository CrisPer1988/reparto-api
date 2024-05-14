const express = require("express");

const productController = require("../controllers/products.controller");

const router = express.Router();

router
  .route("/")
  .post(productController.createProduct)
  .get(productController.getAllProducts);

module.exports = router;
