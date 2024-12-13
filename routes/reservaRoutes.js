const express = require("express");
const router = express.Router();
const reservaController = require("../controllers/reservaController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, reservaController.createReserva);
router.get("/:id", authMiddleware, reservaController.getReservaById); // Ruta para obtener la reserva por ID
router.put("/:id", authMiddleware, reservaController.updateReservaEstado); // Nueva ruta para actualizar el estado de la reserva por ID
router.get("/usuario", authMiddleware, reservaController.getReservasByUsuario);

module.exports = router;
