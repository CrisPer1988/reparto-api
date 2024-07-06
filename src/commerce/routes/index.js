const express = require("express");

const controller = require("../controllers");
const zonesValidatios = require("../../zone/middlewares");

const router = express.Router();

router
  .route("/")
  .post(controller.createCommerce)
  .get(controller.createCommerce);

router
  .route("/:id")
  .get(zonesValidatios.validExistsZone, controller.allCommercesByZone);

module.exports = router;
