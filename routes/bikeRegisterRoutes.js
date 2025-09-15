const express = require("express");
const router = express.Router();
const bikeRegisterController = require("../controllers/bikeRegisterController");

router.post("/", bikeRegisterController.createBikeRegister);
router.get("/", bikeRegisterController.getBikeRegisters);
router.get("/:bikeId", bikeRegisterController.getBikeRegisterById);
router.put("/:bikeId", bikeRegisterController.updateBikeRegister);
router.delete("/:bikeId", bikeRegisterController.deleteBikeRegister);

module.exports = router;
