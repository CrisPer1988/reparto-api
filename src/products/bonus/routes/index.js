const express = require("express");

const bonusControllers = require("../controllers");
// const categoryValidations = require("../../category_product/middlewares");

const router = express.Router();

router.route("/").get(bonusControllers.allBunuses);

router
  .route("/")
  .post(
    /*categoryValidations.validExistsCategory,*/ bonusControllers.createBonus
  );

module.exports = router;
