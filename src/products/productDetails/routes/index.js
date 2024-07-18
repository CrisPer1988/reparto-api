const express = require("express");
const multer = require("multer");

const controllers = require("../controller");
const productsValidations = require("../../middlewares");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router
  .route("/:id")
  .post(
    productsValidations.validExistsProduct,
    upload.single("file"),
    controllers.createProductDetails
  );
// router.route("/").get(controllers.allProducts);

module.exports = router;
