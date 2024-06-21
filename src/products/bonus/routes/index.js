const express = require("express");

const bonusControllers = require("../controllers");
const productValidations = require("../../middlewares");

const router = express.Router();

router
  .route("/:id")
  .post(productValidations.validExistsProduct, bonusControllers.createBonus);

module.exports = router;
