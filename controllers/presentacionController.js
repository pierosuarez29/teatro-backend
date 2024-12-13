const Presentacion = require("../models/Presentacion");
const Butaca = require("../models/Butaca");

// Crear una nueva presentación y generar butacas
exports.createPresentacion = async (req, res) => {
  const { titulo, descripcion, fechaHora, lugar, precioButaca, totalAsientos } = req.body;

  try {
    const nuevaPresentacion = new Presentacion({
      titulo,
      descripcion,
      fechaHora,
      lugar,
      precioButaca,
      totalAsientos,
      asientosDisponibles: totalAsientos,
    });
    const savedPresentacion = await nuevaPresentacion.save();

    // Generar las butacas para la nueva presentación
    const generarAsientos = () => {
      const filas = ['A', 'B', 'C', 'D'];
      const columnas = Array.from({ length: 10 }, (_, i) => i + 1);
      const asientos = [];

      filas.forEach(fila => {
        columnas.forEach(columna => {
          asientos.push({ idPresentacion: savedPresentacion._id, fila, columna });
        });
      });

      return asientos;
    };

    const asientos = generarAsientos();
    await Butaca.insertMany(asientos); // Guardar las butacas en la base de datos

    res.status(201).json({ message: "Presentación creada y butacas generadas exitosamente.", presentacion: savedPresentacion });
  } catch (error) {
    console.error('Error al crear la presentación:', error);
    res.status(500).json({ message: "Error al crear la presentación.", error: error.message });
  }
};




// Obtener todas las presentaciones
exports.getAllPresentaciones = async (req, res) => {
  try {
    const presentaciones = await Presentacion.find();
    res.status(200).json(presentaciones);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las presentaciones.", error: error.message });
  }
};

// Contar butacas disponibles para una presentación
const contarButacasDisponibles = async (idPresentacion) => {
  const count = await Butaca.countDocuments({ idPresentacion, estado: 'disponible' });
  return count;
};

// Obtener una presentación con el número de asientos disponibles actualizado
exports.getPresentacion = async (req, res) => {
  const { id } = req.params;

  try {
    const presentacion = await Presentacion.findById(id);
    if (!presentacion) {
      return res.status(404).json({ message: "Presentación no encontrada." });
    }

    // Contar butacas disponibles
    const asientosDisponibles = await contarButacasDisponibles(id);
    presentacion.asientosDisponibles = asientosDisponibles;
    await presentacion.save();

    res.status(200).json(presentacion);
  } catch (error) {
    console.error('Error al obtener la presentación:', error);
    res.status(500).json({ message: "Error al obtener la presentación.", error: error.message });
  }
};


// Actualizar una presentación
exports.updatePresentacion = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, fechaHora, lugar, precioButaca, totalAsientos } = req.body;

  try {
    const presentacion = await Presentacion.findByIdAndUpdate(id, {
      titulo,
      descripcion,
      fechaHora,
      lugar,
      precioButaca,
      totalAsientos,
      asientosDisponibles: totalAsientos,
    }, { new: true });

    if (!presentacion) {
      return res.status(404).json({ message: "Presentación no encontrada." });
    }

    res.status(200).json({ message: "Presentación actualizada.", presentacion });
  } catch (error) {
    console.error('Error al actualizar la presentación:', error);
    res.status(500).json({ message: "Error al actualizar la presentación.", error: error.message });
  }
};


// Eliminar una presentación
exports.deletePresentacion = async (req, res) => {
  const { id } = req.params;

  try {
    const presentacion = await Presentacion.findByIdAndDelete(id);
    if (!presentacion) {
      return res.status(404).json({ message: "Presentación no encontrada." });
    }

    res.status(200).json({ message: "Presentación eliminada exitosamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la presentación.", error: error.message });
  }
};
