const Commerce = require("../../commerce/model");
const BonusOrder = require("../../products/bonus/bonusOrder/model");
const Bonus = require("../../products/bonus/model");
const Product = require("../../products/model");
const Price = require("../../products/price/model");
const ProductDetails = require("../../products/productDetails/model");
const Zone = require("../../zone/model");
const Order = require("../model");
const Order_Details = require("../order_details/model");
const { Op, or } = require("sequelize");

exports.createOrder = async (req, res) => {
  try {
    const { commerce } = req;
    const { seller_id, zone_id, create } = req.body;

    console.log(req.body);
    const date = new Date();

    if (seller_id && zone_id) {
      const order = await Order.create({
        seller_id,
        zone_id,
        create: date,
        commerce_id: commerce.id,
      });

      return res.status(201).json({
        status: "Success",
        order,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// exports.allOrdersByZone = async (req, res) => {
//   try {
//     const { zone } = req;
//     const { date } = req.body;

//     if (!date) {
//       return res.status(400).json({ message: "Date is required" });
//     }

//     const selectedDate = new Date(date);
//     const startOfDay = new Date(selectedDate);
//     const endOfDay = new Date(selectedDate);

//     startOfDay.setUTCHours(0, 0, 0, 0);
//     endOfDay.setUTCHours(23, 59, 59, 999);

//     const orders = await Order.findAll({
//       where: {
//         zone_id: zone.id,
//         create: {
//           [Op.between]: [startOfDay, endOfDay],
//         },
//       },
//       include: [
//         {
//           model: Order_Details,
//           include: [{ model: Product, include: [{ model: ProductDetails }] }],
//         },
//         { model: Commerce },
//       ],
//     });

//     return res.json({
//       orders,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Internal server error", error: error.message });
//   }
// };

exports.allOrdersByZone = async (req, res) => {
  try {
    const { zone } = req;
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const selectedDate = new Date(date);
    const startOfDay = new Date(selectedDate);
    const endOfDay = new Date(selectedDate);

    startOfDay.setUTCHours(3, 0, 0, 0);
    endOfDay.setUTCHours(26, 59, 59, 999);

    const orders = await Order.findAll({
      where: {
        zone_id: zone.id,
        create: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
      include: [
        {
          model: Order_Details,
          include: [
            {
              model: Product,
            },
            { model: ProductDetails },
            { model: Price },
          ],
        },
        { model: Commerce },
        {
          model: BonusOrder,
          include: [
            {
              model: Bonus,
              include: [
                { model: Product, as: "Product" },
                {
                  model: Product,
                  as: "BonusProduct",
                },
                { model: ProductDetails },
              ],
            },
          ],
        },
        { model: Zone },
      ],
    });

    return res.json({
      orders,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.totalSalesByDateRange = async (req, res) => {
  const { startDate, endDate } = req.body;

  const start = new Date(startDate);
  const end = new Date(endDate);

  start.setUTCHours(3, 0, 0, 0);
  end.setUTCHours(26, 59, 59, 999);

  let totalPrice = 0;

  try {
    const sales = await Order.findAll({
      where: {
        status: "pending",
        create: {
          [Op.between]: [start, end],
        },
      },
      include: [
        {
          model: Order_Details,
          include: [{ model: Product, include: [{ model: Price }] }],
        },
      ],
    });

    sales.forEach((sale) => {
      if (sale.orders_details && Array.isArray(sale.orders_details)) {
        totalPrice += sale.orders_details.reduce(
          (sum, detail) => sum + detail.total_price,
          0
        );
      }
    });

    return res.status(200).json({
      status: "Success",
      sales,
      totalPrice,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Error",
      message: "Something went wrong",
    });
  }
};

exports.totalSalesByDateRangeCompleted = async (req, res) => {
  const { startDate, endDate } = req.body;

  const start = new Date(startDate);
  const end = new Date(endDate);

  start.setUTCHours(3, 0, 0, 0);
  end.setUTCHours(26, 59, 59, 999);

  let totalPrice = 0;

  try {
    const sales = await Order.findAll({
      where: {
        status: "completed",
        create: {
          [Op.between]: [start, end],
        },
      },
      include: [
        {
          model: Order_Details,
          include: [{ model: Product, include: [{ model: Price }] }],
        },
      ],
    });

    sales.forEach((sale) => {
      if (sale.orders_details && Array.isArray(sale.orders_details)) {
        totalPrice += sale.orders_details.reduce(
          (sum, detail) => sum + detail.total_price,
          0
        );
      }
    });

    return res.status(200).json({
      status: "Success",
      sales,
      totalPrice,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Error",
      message: "Something went wrong",
    });
  }
};

exports.totalOrdersPending = async (req, res) => {
  try {
    const orders_pending = await Order.findAll({
      where: {
        status: "pending",
      },
      include: [
        {
          model: Order_Details,
          include: [
            {
              model: Product,
              include: [{ model: Price }],
            },

            { model: ProductDetails },
          ],
        },

        { model: Zone },
        { model: Commerce },
      ],
    });
    return res.status(200).json({
      orders_pending,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Error",
      message: "Something went wrong",
    });
  }
};

exports.completedOrder = async (req, res) => {
  try {
    const { order } = req;

    await order.update({ status: "completed" });

    return res.status(200).json({
      message: "Order Completed",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Error",
      message: "Something went wrong",
    });
  }
};

// exports.rejectedOrder = async (req, res) => {
//   try {
//     const { order } = req;

//     // Asegúrate de que order.bonusOrders esté definido y no sea nulo
//     if (!order || !order.orders_details) {
//       return res.status(400).json({ message: "Invalid order details" });
//     }

//     let details = order.orders_details;

//     for (let detail of details) {
//       const productDetail = await ProductDetails.findOne({
//         where: { id: detail.productsDetail.id },
//         include: [{ model: Bonus }, { model: Product }],
//       });

//       const price = await Price.findOne({
//         where: { id: detail.price_id, status: "active" },
//       });

//       if (productDetail) {
//         if (detail.total_price === price.price * detail.quantity) {
//           productDetail.stock =
//             parseFloat(productDetail.stock) + parseFloat(detail.quantity);
//           console.log("DETAIL QUANTITY", detail.quantity);
//           console.log("actualSTAOCKKK", productDetail.stock);
//         } else {
//           productDetail.stock = (
//             (parseFloat(productDetail.stock) *
//               parseFloat(productDetail.product.pack) +
//               parseFloat(detail.quantity)) /
//             parseFloat(productDetail.product.pack)
//           ).toFixed(2);
//         }

//         if (order.bonusOrders && Array.isArray(order.bonusOrders)) {
//           for (let bonus of order.bonusOrders) {
//             if (bonus.bonus) {
//               const productDetailBonus = await ProductDetails.findOne({
//                 where: { id: bonus.bonus.product_detail_bonus_id },
//                 include: [{ model: Product }],
//               });

//               if (productDetailBonus) {
//                 productDetailBonus.stock = parseFloat(
//                   (
//                     parseFloat(bonus.bonus.bonus_quantity) /
//                       parseFloat(productDetailBonus.product.pack) +
//                     parseFloat(productDetailBonus.stock)
//                   ).toFixed(2)
//                 );

//                 console.log("DETAIL BONUSSSSS", productDetailBonus);

//                 // await productDetailBonus.update({ stock: newStock });
//               }
//               await productDetailBonus.save();
//             }
//           }
//         }

//         console.log("DETAILLLLLLL", productDetail.stock);

//         await productDetail.save();
//       }
//     }

//     await order.update({ status: "rejected" });

//     return res.status(200).json({
//       message: "Order rejected and stock updated",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       status: "Error",
//       message: "Something went wrong",
//     });
//   }
// };

exports.rejectedOrder = async (req, res) => {
  try {
    const { order } = req;

    if (!order || !order.orders_details) {
      return res.status(400).json({ message: "Invalid order details" });
    }

    let details = order.orders_details;

    for (let detail of details) {
      const productDetail = await ProductDetails.findOne({
        where: { id: detail.productsDetail.id },
        include: [{ model: Bonus }, { model: Product }],
      });

      const price = await Price.findOne({
        where: { id: detail.price_id, status: "active" },
      });

      if (productDetail) {
        if (detail.total_price === price.price * detail.quantity) {
          productDetail.stock =
            parseFloat(productDetail.stock) + parseFloat(detail.quantity);
        } else {
          productDetail.stock = (
            (parseFloat(productDetail.stock) *
              parseFloat(productDetail.product.pack) +
              parseFloat(detail.quantity)) /
            parseFloat(productDetail.product.pack)
          ).toFixed(2);
        }

        if (order.bonusOrders && Array.isArray(order.bonusOrders)) {
          // Inicializa la cantidad de bonificación total
          let totalBonusQuantity = 0;

          for (let bonus of order.bonusOrders) {
            if (bonus.bonus) {
              if (bonus.bonus.product_detail_bonus_id === productDetail.id) {
                // Acumula la cantidad de bonificación si es el mismo producto
                console.log("MISMO PRODUCTOOOOOOOO", productDetail.flavor);

                totalBonusQuantity += parseFloat(bonus.bonus.bonus_quantity);
              } else {
                // Si es un producto distinto, actualiza ese producto

                const productDetailBonus = await ProductDetails.findOne({
                  where: { id: bonus.bonus.product_detail_bonus_id },
                  include: [{ model: Product }],
                });
                console.log(
                  "Distintoooooo PRODUCTOOOOOOOO",
                  productDetailBonus.flavor
                );
                console.log("totalBonusQuantityasasaasa", totalBonusQuantity);

                if (productDetailBonus) {
                  productDetailBonus.stock = parseFloat(
                    (
                      parseFloat(bonus.bonus.bonus_quantity) /
                        parseFloat(productDetailBonus.product.pack) +
                      parseFloat(productDetailBonus.stock)
                    ).toFixed(2)
                  );

                  console.log("DETAIL BONUS UPDATED", productDetailBonus.stock);
                  await productDetailBonus.save();
                }
              }
            }
          }

          // Si se encontraron bonificaciones para el mismo producto, actualiza el stock de una vez
          if (totalBonusQuantity > 0) {
            productDetail.stock =
              parseFloat(productDetail.stock) +
              totalBonusQuantity / parseFloat(productDetail.product.pack);
          }
        }

        await productDetail.save();
      }
    }

    await order.update({ status: "rejected" });

    return res.status(200).json({
      message: "Order rejected and stock updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Error",
      message: "Something went wrong",
    });
  }
};
