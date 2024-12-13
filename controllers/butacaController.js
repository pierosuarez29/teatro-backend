const Butaca = require("../models/Butaca");
const Presentacion = require("../models/Presentacion");
const authMiddleware = require("../middlewares/authMiddleware");

// Crear una nueva butaca
exports.createButaca = async (req, res) => {
  const { idPresentacion, fila, columna } = req.body;

  try {
    const presentacion = await Presentacion.findById(idPresentacion);
    if (!presentacion) {
      return res.status(404).json({ message: "Presentación no encontrada." });
    }

    const nuevaButaca = new Butaca({ idPresentacion, fila, columna });
    await nuevaButaca.save();
    res.status(201).json({ message: "Butaca creada exitosamente.", butaca: nuevaButaca });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la butaca.", error: error.message });
  }
};

// Obtener todas las butacas de una presentación
exports.getButacasByPresentacion = async (req, res) => {
  const { idPresentacion } = req.params;

  try {
    const butacas = await Butaca.find({ idPresentacion });
    res.status(200).json(butacas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las butacas.", error: error.message });
  }
};

// Actualizar estado de una butaca
exports.updateButaca = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const butaca = await Butaca.findByIdAndUpdate(id, { estado }, { new: true });
    if (!butaca) {
      return res.status(404).json({ message: "Butaca no encontrada." });
    }

    res.status(200).json({ message: "Estado de la butaca actualizado.", butaca });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la butaca.", error: error.message });
  }
};

// Eliminar una butaca
exports.deleteButaca = async (req, res) => {
  const { id } = req.params;

  try {
    const butaca = await Butaca.findByIdAndDelete(id);
    if (!butaca) {
      return res.status(404).json({ message: "Butaca no encontrada." });
    }

    res.status(200).json({ message: "Butaca eliminada exitosamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la butaca.", error: error.message });
  }
};
