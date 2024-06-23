const express = require("express");

const categoriesController = require("../controllers");
const distributorValidations = require("../../../distributor/middlewares");
const router = express.Router();

router
  .route("/:id")
  .post(
    distributorValidations.validExistsDistributor,
    categoriesController.createCategory
  )
  .get(
    distributorValidations.validExistsDistributor,
    categoriesController.allCategories
  );

module.exports = router;
