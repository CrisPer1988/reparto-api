const express = require("express");

const controllers = require("../controllers");
const bonusValidations = require("../middlewares");
const router = express.Router();

router.route("/").post(controllers.createBonus).get(controllers.allBunuses);

router
  .route("/:id")
  .delete(bonusValidations.validExistBonus, controllers.deleteBonus)
  .patch(bonusValidations.validExistBonus, controllers.updatedBonus);

module.exports = router;
