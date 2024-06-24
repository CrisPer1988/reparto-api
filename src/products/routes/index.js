const express = require("express");
const multer = require("multer");

const controllers = require("../controllers");
const categoryValidations = require("../category/middlewares");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router
  .route("/:id")
  .post(
    upload.single("file"),
    categoryValidations.validExistCategory,
    controllers.createProduct
  );
router.route("/").get(controllers.allProducts);

module.exports = router;
