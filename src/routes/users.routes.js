const express = require("express");

const userController = require("../controllers/users.controller");

const router = express.Router();

router.route("/").post(userController.createUser);

router.post("/login", userController.loginUser);

module.exports = router;
