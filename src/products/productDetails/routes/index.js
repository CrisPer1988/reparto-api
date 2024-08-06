// const express = require("express");
// const multer = require("multer");

// const controllers = require("../controller");
// const productsValidations = require("../../middlewares");

// const router = express.Router();
// const upload = multer({ dest: "uploads/" });

// router
//   .route("/:id")
//   .post(
//     productsValidations.validExistsProduct,
//     upload.single("file"),
//     controllers.createProductDetails
//   );

// router
//   .route("/product/:id")
//   .get(
//     productsValidations.validExistsProduct,
//     controllers.allProductDetailsByProduct
//   );

// // router.route("/").get(controllers.allProducts);

// module.exports = router;

const express = require("express");
const multer = require("multer");
const path = require("path");

const controllers = require("../controller");
const productsValidations = require("../../middlewares");
const productDetailValidations = require("../../productDetails/middlewares");

const router = express.Router();
const upload = multer({ dest: path.join("/tmp", "uploads") });

router
  .route("/:id")
  .post(
    productsValidations.validExistsProduct,
    upload.single("file"),
    controllers.createProductDetails
  )
  .delete(
    productDetailValidations.validExistsProductDetail,
    controllers.deleteProductDetail
  );

router
  .route("/:id/stock")
  .patch(
    productDetailValidations.validExistsProductDetail,
    controllers.editStock
  );

router
  .route("/product/:id")
  .get(
    productsValidations.validExistsProduct,
    controllers.allProductDetailsByProduct
  );

// router.route("/").get(controllers.allProducts);

module.exports = router;
