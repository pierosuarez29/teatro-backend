const Comentario = require("../models/Comentario");

// Crear un nuevo comentario
exports.createComentario = async (req, res) => {
  const { idPresentacion, comentario } = req.body;
  const userId = req.user.id;

  try {
    const nuevoComentario = new Comentario({ idUsuario: userId, idPresentacion, comentario });
    await nuevoComentario.save();
    res.status(201).json({ message: "Comentario agregado exitosamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar el comentario.", error: error.message });
  }
};

// Obtener comentarios de una presentación
exports.getComentariosByPresentacion = async (req, res) => {
  const { idPresentacion } = req.params;

  try {
    const comentarios = await Comentario.find({ idPresentacion }).populate("idUsuario");
    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los comentarios.", error: error.message });
  }
};
