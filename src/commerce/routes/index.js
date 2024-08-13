const express = require("express");

const controller = require("../controllers");
const zonesValidation = require("../../zone/middlewares");
const commerceValidatios = require("../middlewares");

const router = express.Router();

router.route("/").post(controller.createCommerce).get(controller.allCommerces);

router
  .route("/:id")
  .get(zonesValidation.validExistsZone, controller.allCommercesByZone)
  .put(commerceValidatios.validExistsCommerce, controller.updatedCommerce)
  .delete(commerceValidatios.validExistsCommerce, controller.deleteCommerce);

module.exports = router;
