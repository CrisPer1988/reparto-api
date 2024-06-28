const express = require("express");

const controller = require("../controllers");

const router = express.Router();

router.route("/").post(controller.createCommerce);

module.exports = router;
