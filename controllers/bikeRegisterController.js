const BikeRegister = require("../models/bikeRegisterModel");

// Create a new bike register entry
exports.createBikeRegister = async (req, res) => {
  try {
    const { bikeId, userId, name } = req.body;
    const bike = await BikeRegister.create({ bikeId, userId, name });

    res.status(201).json({
      status: "success",
      message: "Bike registered successfully",
      data: bike,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get all bike registers
exports.getBikeRegisters = async (req, res) => {
  try {
    const bikes = await BikeRegister.find();

    res.status(200).json({
      status: "success",
      message: "Bike registers retrieved successfully",
      data: bikes,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get a single bike register by bikeId
exports.getBikeRegisterById = async (req, res) => {
  try {
    const bike = await BikeRegister.findOne({ bikeId: req.params.bikeId });

    if (!bike) {
      return res.status(404).json({
        status: "error",
        message: "Bike not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Bike register retrieved successfully",
      data: bike,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Update a bike register
exports.updateBikeRegister = async (req, res) => {
  try {
    const bike = await BikeRegister.findOneAndUpdate(
      { bikeId: req.params.bikeId },
      req.body,
      { new: true }
    );

    if (!bike) {
      return res.status(404).json({
        status: "error",
        message: "Bike not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Bike register updated successfully",
      data: bike,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// Delete a bike register
exports.deleteBikeRegister = async (req, res) => {
  try {
    const bike = await BikeRegister.findOneAndDelete({ bikeId: req.params.bikeId });

    if (!bike) {
      return res.status(404).json({
        status: "error",
        message: "Bike not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Bike deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
