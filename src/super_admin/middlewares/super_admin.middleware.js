const Admin = require("../../admin/model/admin.model");
const Delivery_man = require("../../delivery_man/model/delivery_man.model");
const Product = require("../../products/model/product.model");
const Seller = require("../../sellers/model/sellers.model");
const Super_Admin = require("../model/super_admin.model");

exports.validExistsSuperAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    const superAdmin = await Super_Admin.findOne({
      where: {
        id,
        status: "active",
      },
      include: [
        { model: Admin },
        { model: Seller },
        { model: Delivery_man },
        { model: Product },
      ],
    });

    req.superAdmin = superAdmin;
    next();
  } catch (error) {
    res.json({ message: error });
  }
};
