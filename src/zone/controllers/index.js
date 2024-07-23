const Zone = require("../model");
const Seller = require("../../sellers/model/sellers.model");

exports.createZone = async (req, res) => {
  try {
    const { name, seller_id } = req.body;

    console.log(req.body);

    const findZone = await Zone.findOne({ where: { name, status: "active" } });

    if (findZone) {
      res.status(404).json({ message: "Zone exists" });
    } else {
      const zone = await Zone.create({
        name,
        seller_id,
      });
      return res.status(201).json({
        status: "Success",
        zone,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.allZones = async (req, res) => {
  try {
    const zones = await Zone.findAll({
      where: { status: "active" },
      include: [{ model: Seller }],
    });

    return res.status(200).json({
      status: "Success",
      zones,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.oneZone = async (req, res) => {
  try {
    const { zone } = req;

    return res.status(200).json({
      status: "Success",
      zone,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.allZonesBySeller = async (req, res) => {
  try {
    const { seller } = req;

    const zones = await Zone.findAll({
      where: { status: "active", seller_id: seller.id },
      // include: [{ model: Seller }],
    });

    return res.status(200).json({
      status: "Success",
      zones,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.updateZone = async (req, res) => {
  try {
    const { zone } = req;
    const { seller_id, delivery_man_id, name } = req.body;

    await zone.update({
      seller_id: seller_id || zone.seller_id,
      delivery_man_id: delivery_man_id || zone.delivery_man_id,
      name: name || zone.name,
    });

    return res.status(201).json({
      status: "Success",
      zone,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
