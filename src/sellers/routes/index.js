const express = require("express");

const controllers = require("../controllers");
const validationsDistributor = require("../../distributor/middlewares");
const router = express.Router();

router
  .route("/:id")
  .post(
    validationsDistributor.validExistsDistributor,
    controllers.createSeller
  );

module.exports = router;
