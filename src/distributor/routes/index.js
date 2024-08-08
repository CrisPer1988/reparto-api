// const express = require("express");
// const multer = require("multer");

// const distributorController = require("../controllers");
// const validations = require("../middlewares");
// const validationsOwner = require("../../owner/middlewares");
// const upload = multer({ dest: "uploads/" });

// const router = express.Router();

// router.route("/login").post(distributorController.loginDistributor);
// router
//   .route("/:id")
//   .post(
//     validationsOwner.validExistsOwner,
//     upload.single("file"),
//     distributorController.createDistributor
//   );
// router
//   .route("/:id")
//   .get(
//     validations.validExistsDistributor,
//     distributorController.findDistributor
//   );

// //admin
// router
//   .route("/:id/admin")
//   .post(validations.validExistsDistributor, distributorController.createAdmin);

// module.exports = router;

const express = require("express");
const multer = require("multer");
const path = require("path");

const distributorController = require("../controllers");
const validations = require("../middlewares");
const validationsOwner = require("../../owner/middlewares");

// Configuración de multer para almacenar archivos en /tmp/uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("/tmp", "uploads")); // Asegúrate de que la carpeta existe
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Usar el nombre original del archivo
  },
});

const upload = multer({ storage: storage });

// Crear el router de Express
const router = express.Router();

// Ruta para login del distribuidor
router.route("/login").post(distributorController.loginDistributor);

// Ruta para crear un distribuidor con validaciones y subida de archivo
router.route("/:id").post(
  validationsOwner.validExistsOwner,
  upload.single("file"), // Middleware de multer para manejar la subida del archivo
  distributorController.createDistributor
);

// Ruta para obtener un distribuidor con validaciones
router
  .route("/:id")
  .get(
    validations.validExistsDistributor,
    distributorController.findDistributor
  )
  .patch(distributorController.changePassword);

// Ruta para crear un admin con validaciones
router
  .route("/:id/admin")
  .post(validations.validExistsDistributor, distributorController.createAdmin);

module.exports = router;
