const express = require("express");
const router = express.Router();
const comentarioController = require("../controllers/comentarioController");
const authMiddleware = require('../middlewares/authMiddleware'); // Importar middleware de autenticación

router.post("/", authMiddleware, comentarioController.createComentario);
router.get("/:idPresentacion", comentarioController.getComentariosByPresentacion);

module.exports = router;
