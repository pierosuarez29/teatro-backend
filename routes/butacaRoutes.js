const express = require("express");
const router = express.Router();
const butacaController = require("../controllers/butacaController");

router.post("/", butacaController.createButaca);
router.get("/:idPresentacion", butacaController.getButacasByPresentacion);
router.put("/:id", butacaController.updateButaca);
router.delete("/:id", butacaController.deleteButaca);

module.exports = router;
