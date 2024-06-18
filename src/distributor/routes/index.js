const express = require("express");
const multer = require("multer");

const distributorController = require("../controllers");
const validations = require("../middlewares");
const validationsOwner = require("../../owner/middlewares");
const router = express.Router();

router.route("/login").post(distributorController.loginDistributor);
router
  .route("/:id")
  .post(
    validationsOwner.validExistsOwner,
    distributorController.createDistributor
  );
router
  .route("/:id")
  .get(
    validations.validExistsDistributor,
    distributorController.findDistributor
  );

//admin
router
  .route("/:id/admin")
  .post(validations.validExistsDistributor, distributorController.createAdmin);

module.exports = router;
