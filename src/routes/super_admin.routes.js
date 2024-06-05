const express = require("express");

const superAdminController = require("../controllers/super_admin.controller");
const router = express.Router();

router.route("/admin").post(superAdminController.createSuperAdmin);
router.route("/admin/login").post(superAdminController.loginSuperAdmin);

module.exports = router;
