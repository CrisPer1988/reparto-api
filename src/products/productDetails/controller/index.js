const { uploadImage } = require("../../../utils/uploadImage");
const ProductDetails = require("../model");

exports.createProductDetails = async (req, res) => {
  try {
    const { product } = req;
    const { flavor, stock } = req.body;

    if (!req.file) {
      throw new Error("Image file is required");
    }

    const imageFile = req.file;

    const imageUrl = await uploadImage(imageFile);

    const productDetails = await ProductDetails.create({
      flavor,
      stock,
      image: imageUrl,
      product_id: product.id,
    });

    return res.status(201).json({
      status: "Success",
      productDetails,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

exports.allProductDetailsByProduct = async (req, res) => {
  try {
    const { product } = req;

    console.log(product);

    const productDetails = await ProductDetails.findAll({
      where: {
        product_id: product.id,
      },
    });

    return res.status(201).json({
      status: "Success",
      productDetails,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

// exports.editProductDetail = async (req, res) => {
//   try {
//     const { productDetail } = req;
//     const { flavor, newStock, operator } = req.body;

//     if (newStock && operator) {
//       let updateStock = 0;
//       if (operator === "+") {
//         updateStock = productDetail.stock + newStock;
//       }

//       console.log("NEWWWWWW", updateStock);
//     }

//     await productDetail.update({
//       flavor: flavor,

//     });

//     return res.status(200).json({
//       status: "Success",
//       // productDetailUpdate,
//     });
//   } catch (error) {
//     res.json({
//       message: error,
//     });
//   }
// };

// exports.editStock = async (req, res) => {
//   try {
//     const { productDetail } = req;
//     const { newStock, operator, quantity } = req.body;

//     console.log(productDetail.product);

//     if (newStock && operator) {
//       let updateStock = 0;
//       const currentStock = parseFloat(productDetail.stock);
//       const additionalStock = parseFloat(newStock);

//       if (operator === "+" && quantity === "pack") {
//         updateStock = currentStock + additionalStock;
//       } else if (operator === "-" && quantity === "pack") {
//         updateStock = currentStock - additionalStock;
//       }
//       await productDetail.update({
//         stock: updateStock,
//       });
//     } else {
//       await productDetail.update({
//         flavor: flavor,
//       });
//     }

//     return res.status(200).json({
//       status: "Success",
//       Product: productDetail.product,
//     });
//   } catch (error) {
//     res.json({
//       message: error,
//     });
//   }
// };

exports.editStock = async (req, res) => {
  try {
    const { productDetail } = req;
    const { newStock, operator, quantity } = req.body;

    console.log(productDetail.product);

    if (newStock && operator) {
      let updateStock = 0;
      const currentStock = parseFloat(productDetail.stock);
      const additionalStock = parseFloat(newStock);

      if (quantity === "pack") {
        if (operator === "+") {
          updateStock = currentStock + additionalStock;
        } else if (operator === "-") {
          updateStock = currentStock - additionalStock;
        }
      } else if (quantity === "unidad") {
        const stockInPacks = additionalStock / productDetail.product.pack;
        if (operator === "+") {
          updateStock = currentStock + stockInPacks;
        } else if (operator === "-") {
          updateStock = currentStock - stockInPacks;
        }
      }

      await productDetail.update({
        stock: updateStock,
      });
    }

    return res.status(200).json({
      status: "Success",
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};
