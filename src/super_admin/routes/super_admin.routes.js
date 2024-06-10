const express = require("express");

const superAdminController = require("../controllers/super_admin.controller");
const router = express.Router();

router.route("/").post(superAdminController.createSuperAdmin);
router.route("/login").post(superAdminController.loginSuperAdmin);
router.route("/admin").post(superAdminController.createAdmin);
router.route("/seller").post(superAdminController.createSeller);
router.route("/delivery").post(superAdminController.createDeliveryMan);

module.exports = router;
