const express = require("express");
// const multer = require("multer");

const ownerController = require("../controllers");
// const validations = require("../middlewares");
const router = express.Router();

router.route("/").post(ownerController.createOwner);

module.exports = router;
