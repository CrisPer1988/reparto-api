const express = require("express");

const controllers = require("../controllers");

const router = express.Router();

router.route("/").post(controllers.createProduct);
router.route("/").get(controllers.allProducts);

module.exports = router;
