const express = require("express");

const controllers = require("../controllers");
const validationsDistributor = require("../../distributor/middlewares");
const router = express.Router();

router.route("/").post(controllers.createSeller);

router.route("/login").post(controllers.loginSeller);

module.exports = router;
