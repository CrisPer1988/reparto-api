const express = require("express");
const multer = require("multer");

const controllers = require("../controllers");
const validationsDistributor = require("../../distributor/middlewares");
const router = express.Router();
const upload = multer({ dest: "uploads/" });

router
  .route("/:id")
  .post(
    upload.single("file"),
    validationsDistributor.validExistsDistributor,
    controllers.createProduct
  );

module.exports = router;
