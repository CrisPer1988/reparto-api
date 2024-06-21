const express = require("express");

const zoneControllers = require("../controllers");
const zoneValidations = require("../middlewares");
const router = express.Router();

router.route("/").post(zoneControllers.createZone);

router
  .route("/:id")
  .patch(zoneValidations.validExistsZone, zoneControllers.updateZone);

module.exports = router;
