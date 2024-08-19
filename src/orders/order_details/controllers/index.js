// const Category = require("../../../products/category/model");
const Product = require("../../../products/model");
const Price = require("../../../products/price/model");
const Order_Details = require("../model");
const Bonus = require("../../../products/bonus/model");

const { Op } = require("sequelize");
const ProductDetails = require("../../../products/productDetails/model");
const BonusOrder = require("../../../products/bonus/bonusOrder/model");

// exports.createOrderDetails = async (req, res) => {
//   try {
//     const { order } = req;
//     const details = req.body.details;

//     if (!details || !Array.isArray(details)) {
//       return res.status(400).json({ message: "Invalid details format" });
//     }

//     console.log(details);

//     const orderDetails = [];
//     const bonification = {};
//     const applicableBonuses = [];

//     for (const detail of details) {
//       const { product_id, price_id, quantity, product_detail_id, unit } =
//         detail;

//       const product = await Product.findOne({
//         where: { id: product_id },
//         include: [{ model: ProductDetails }],
//       });

//       const productDetails = await ProductDetails.findOne({
//         where: { id: product_detail_id },
//       });

//       if (!product) {
//         return res
//           .status(404)
//           .json({ message: `Product with id ${product_id} not found` });
//       }

//       const price = await Price.findOne({ where: { id: price_id } });

//       if (!price) {
//         return res
//           .status(404)
//           .json({ message: `Price with id ${price_id} not found` });
//       }

//       if (quantity > productDetails.stock) {
//         return res.status(200).json({
//           status: "Failed",
//           message: `Stock insuficiente de: ${productDetails.flavor}, solo quedan: ${productDetails.stock}`,
//         });
//       }

//       let totalPrice;
//       if (unit === "pack") {
//         totalPrice = price.price * quantity;
//       } else {
//         totalPrice = (price.price / product.pack) * quantity;
//       }

//       const orderDetail = await Order_Details.create({
//         product_id,
//         price_id,
//         product_detail_id,
//         quantity,
//         order_id: order.id,
//         total_price: totalPrice,
//       });
//       const productName = product.name;

//       if (bonification[productName]) {
//         bonification[productName] += quantity;
//       } else {
//         bonification[productName] = quantity;
//       }

//       let newStock;

//       if (unit === "pack") {
//         newStock = productDetails.stock - quantity;
//       } else {
//         newStock =
//           (productDetails.stock * product.pack - quantity) / product.pack;
//       }

//       await productDetails.update({ stock: newStock });

//       const bonuses = await Bonus.findAll({
//         where: {
//           status: "active",
//           product_id: product.id,
//           quantity: {
//             [Op.lte]: bonification[productName],
//           },
//         },
//         include: [{ model: Product, as: "BonusProduct" }],
//         order: [["quantity", "DESC"]],
//         limit: 1,
//       });

//       const bonus = bonuses[0];

//       if (bonus && price.name === "Normal") {
//         const productDetailBonus = await ProductDetails.findOne({
//           where: { id: bonus.product_detail_bonus_id },
//           include: [{ model: Product }],
//         });
//         const newStock =
//           (parseFloat(productDetailBonus.stock) *
//             productDetailBonus.product.pack -
//             bonus.bonus_quantity) /
//           productDetailBonus.product.pack;

//         await productDetailBonus.update({
//           stock: newStock,
//         });
//         applicableBonuses.push(bonus);

//         await BonusOrder.create({
//           order_id: order.id,
//           bonus_id: bonus.id,
//         });
//       }

//       orderDetails.push({
//         product,
//         productDetails,
//         total_price: orderDetail.total_price,
//       });
//     }

//     return res.status(201).json({ orderDetails, applicableBonuses });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Internal server error", error: error.message });
//   }
// };

//PROBAR ESTA MODIFICACION PARA BONUS MULTIPLES
exports.createOrderDetails = async (req, res) => {
  try {
    const { order } = req;
    const details = req.body.details;

    if (!details || !Array.isArray(details)) {
      return res.status(400).json({ message: "Invalid details format" });
    }

    const orderDetails = [];
    const bonification = {};
    const applicableBonuses = {};
    let getPrice;

    for (const detail of details) {
      const { product_id, price_id, quantity, product_detail_id, unit } =
        detail;

      const product = await Product.findOne({
        where: { id: product_id },
        include: [{ model: ProductDetails }],
      });

      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with id ${product_id} not found` });
      }

      const productDetails = await ProductDetails.findOne({
        where: { id: product_detail_id },
      });

      const price = await Price.findOne({ where: { id: price_id } });
      getPrice = price;

      if (!price) {
        return res
          .status(404)
          .json({ message: `Price with id ${price_id} not found` });
      }

      if (quantity > productDetails.stock) {
        return res.status(200).json({
          status: "Failed",
          message: `Stock insuficiente de: ${productDetails.flavor}, solo quedan: ${productDetails.stock}`,
        });
      }

      let totalPrice;
      if (unit === "pack") {
        totalPrice = price.price * quantity;
      } else {
        totalPrice = (price.price / product.pack) * quantity;
      }

      const orderDetail = await Order_Details.create({
        product_id,
        price_id,
        product_detail_id,
        quantity,
        order_id: order.id,
        total_price: totalPrice,
      });

      const productName = `${product.name}-${product.quantity}`;

      if (bonification[productName]) {
        bonification[productName].totalQuantity += quantity;
      } else {
        bonification[productName] = { totalQuantity: quantity, product_id };
      }

      let newStock;

      if (unit === "pack") {
        newStock = productDetails.stock - quantity;
      } else {
        newStock =
          (productDetails.stock * product.pack - quantity) / product.pack;
      }

      await productDetails.update({ stock: newStock });

      orderDetails.push({
        product,
        productDetails,
        total_price: orderDetail.total_price,
      });
    }

    // Aquí es donde sumamos todas las cantidades y aplicamos las bonificaciones
    for (const [productName, { totalQuantity, product_id }] of Object.entries(
      bonification
    )) {
      let remainingBonusQuantity = totalQuantity;

      // Buscar todas las bonificaciones aplicables para el producto
      const bonuses = await Bonus.findAll({
        where: {
          status: "active",
          product_id: product_id,
          quantity: {
            [Op.lte]: totalQuantity,
          },
        },
        include: [{ model: Product, as: "BonusProduct" }],
        order: [["quantity", "DESC"]],
      });
      console.log("priceeeeeeeeee", getPrice);
      if (bonuses && getPrice.name === "Normal") {
        for (const bonus of bonuses) {
          const applicableBonusCount = Math.floor(
            remainingBonusQuantity / bonus.quantity
          );

          for (let i = 0; i < applicableBonusCount; i++) {
            const productDetailBonus = await ProductDetails.findOne({
              where: { id: bonus.product_detail_bonus_id },
              include: [{ model: Product }],
            });

            const newBonusStock =
              (parseFloat(productDetailBonus.stock) *
                productDetailBonus.product.pack -
                bonus.bonus_quantity) /
              productDetailBonus.product.pack;

            await productDetailBonus.update({ stock: newBonusStock });

            if (!applicableBonuses[productName]) {
              applicableBonuses[productName] = [];
            }
            applicableBonuses[productName].push(bonus);

            await BonusOrder.create({
              order_id: order.id,
              bonus_id: bonus.id,
            });

            remainingBonusQuantity -= bonus.quantity;
          }
        }
      }
    }

    return res.status(201).json({ orderDetails, applicableBonuses });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
