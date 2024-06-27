const express = require("express");

const controllers = require("../controllers");

const router = express.Router();

router
  .route("/")
  .post(controllers.createCategory)
  .get(controllers.allCategories);

module.exports = router;
