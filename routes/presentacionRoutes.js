const express = require("express");
const router = express.Router();
const presentacionController = require("../controllers/presentacionController");

router.post("/", presentacionController.createPresentacion);
router.get("/:id", presentacionController.getPresentacion);
router.get("/", presentacionController.getAllPresentaciones);
router.put("/:id", presentacionController.updatePresentacion);
router.delete("/:id", presentacionController.deletePresentacion);


module.exports = router;
