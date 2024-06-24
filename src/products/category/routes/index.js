const express = require("express");

const controllers = require("../controllers");

const router = express.Router();

router.route("/").post(controllers.createCategory);

module.exports = router;
