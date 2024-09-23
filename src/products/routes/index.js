const express = require("express");

const controllers = require("../controllers");
const validation = require("../middlewares");

const router = express.Router();

router.route("/").post(controllers.createProduct).get(controllers.allProducts);
router
  .route("/:id")
  .patch(validation.validExistsProduct, controllers.updatedProduct);

module.exports = router;
