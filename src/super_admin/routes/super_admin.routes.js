const express = require("express");
const multer = require("multer");

const superAdminController = require("../controllers/super_admin.controller");
const validations = require("../middlewares/super_admin.middleware");
const router = express.Router();
const upload = multer({ dest: "uploads/" });

// superadmin
router.route("/").post(superAdminController.createSuperAdmin);
router.route("/login").post(superAdminController.loginSuperAdmin);
router
  .route("/:id")
  .get(validations.validExistsSuperAdmin, superAdminController.findSuperAdmin);

// products
router
  .route("/:id/product")
  .post(
    upload.single("file"),
    validations.validExistsSuperAdmin,
    superAdminController.createProduct
  );

//admin
router
  .route("/:id/admin")
  .post(validations.validExistsSuperAdmin, superAdminController.createAdmin);

// seller
router
  .route("/:id/seller")
  .post(validations.validExistsSuperAdmin, superAdminController.createSeller);

// delivery
router
  .route("/:id/delivery")
  .post(
    validations.validExistsSuperAdmin,
    superAdminController.createDeliveryMan
  );

module.exports = router;
