const express = require("express");

const controllers = require("../controllers");
const validationsDistributor = require("../../distributor/middlewares");
const router = express.Router();
const validationSeller = require("../middlewares");

router.route("/").post(controllers.createSeller).get(controllers.allSeller);

router.route("/login").post(controllers.loginSeller);

router
  .route("/:id")
  .delete(validationSeller.validExistsSeller, controllers.deleteSeller);

module.exports = router;
