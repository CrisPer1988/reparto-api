const express = require("express");

const superAdminController = require("../controllers/super_admin.controller");
const validations = require("../middlewares/super_admin.middleware");
const router = express.Router();

router.route("/").post(superAdminController.createSuperAdmin);
router.route("/login").post(superAdminController.loginSuperAdmin);
router
  .route("/:id/admin")
  .post(validations.validExistsSuperAdmin, superAdminController.createAdmin);
router
  .route("/:id/seller")
  .post(validations.validExistsSuperAdmin, superAdminController.createSeller);
router
  .route("/:id/delivery")
  .post(
    validations.validExistsSuperAdmin,
    superAdminController.createDeliveryMan
  );
router
  .route("/:id")
  .get(validations.validExistsSuperAdmin, superAdminController.findSuperAdmin);

module.exports = router;
