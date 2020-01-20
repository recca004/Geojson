const Store = require("../models/stores");
// @desc Get all stores
// @route Get /app/v1/stores
// @access Public

exports.getStores = async (req, res, next) => {
  try {
    const stores = await Store.find();

    return res.status(200).json({
      success: true,
      count: stores.length,
      data: stores
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc Create a stores
// @route POST /app/v1/stores
// @access Public

exports.addStores = async (req, res, next) => {
  try {
    const stores = await Store.create(req.body);

    return res.status(200).json({ success: true, data: stores });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "This store already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
};
