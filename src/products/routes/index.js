const express = require("express");
const multer = require("multer");

const controllers = require("../controllers");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router
  .route("/")
  .post(upload.single("file"), controllers.createProduct)
  .get(controllers.allProducts);

module.exports = router;
