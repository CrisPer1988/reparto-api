const express = require("express");

const categoriesController = require("../controllers");
const router = express.Router();

router.route("/").post(categoriesController.createCategory);

module.exports = router;
