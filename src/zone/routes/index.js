const express = require("express");

const controllers = require("../controllers");
const zoneValidations = require("../middlewares");
const sellerValidations = require("../../sellers/middlewares");
const router = express.Router();

router.route("/").post(controllers.createZone).get(controllers.allZones);

router
  .route("/:id")
  .patch(zoneValidations.validExistsZone, controllers.updateZone)
  .get(zoneValidations.validExistsZone, controllers.oneZone);

router
  .route("/seller/:id")
  .get(sellerValidations.validExistsSeller, controllers.allZonesBySeller);

module.exports = router;
