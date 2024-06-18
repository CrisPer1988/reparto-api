const express = require("express");

const typesController = require("../controllers");
const validationsCategory = require("../../category_product/middlewares");
const router = express.Router();

router
  .route("/:id")
  .post(validationsCategory.validExistsCategory, typesController.createType);

module.exports = router;
