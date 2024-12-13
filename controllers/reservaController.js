const Reserva = require("../models/Reserva");
const Butaca = require("../models/Butaca");
const Presentacion = require("../models/Presentacion");

// Crear una nueva reserva
exports.createReserva = async (req, res) => {
  const { idPresentacion, asientos } = req.body;
  const userId = req.user.id; // Usuario autenticado

  try {
    const presentacion = await Presentacion.findById(idPresentacion);
    if (!presentacion) {
      return res.status(404).json({ message: "Presentación no encontrada." });
    }

    const asientosReservados = await Butaca.find({ _id: { $in: asientos }, estado: "reservado" });
    if (asientosReservados.length > 0) {
      return res.status(400).json({ message: "Algunos asientos ya están reservados." });
    }

    const nuevaReserva = new Reserva({
      idUsuario: userId,
      idPresentacion,
      totalPago: presentacion.precioButaca * asientos.length,
      butacas: asientos
    });

    await nuevaReserva.save();

    // Actualizar estado de las butacas
    await Butaca.updateMany(
      { _id: { $in: asientos } },
      { estado: "reservado" }
    );

    res.status(201).json({ message: "Reserva realizada exitosamente.", reserva: nuevaReserva });
  } catch (error) {
    console.error('Error al crear la reserva:', error); // Log para depuración
    res.status(500).json({ message: "Error al crear la reserva.", error: error.message });
  }
};

// Obtener una reserva por ID
exports.getReservaById = async (req, res) => {
  const { id } = req.params;

  try {
    const reserva = await Reserva.findById(id).populate("idPresentacion").populate("butacas");
    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada." });
    }
    res.status(200).json(reserva);
  } catch (error) {
    console.error('Error al obtener la reserva:', error); // Log para depuración
    res.status(500).json({ message: "Error al obtener la reserva.", error: error.message });
  }
};


// Actualizar el estado de una reserva
exports.updateReservaEstado = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const reserva = await Reserva.findById(id);
    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada." });
    }

    reserva.estado = estado;
    await reserva.save();

    res.status(200).json({ message: "Estado de la reserva actualizado exitosamente.", reserva });
  } catch (error) {
    console.error('Error al actualizar el estado de la reserva:', error); // Log para depuración
    res.status(500).json({ message: "Error al actualizar el estado de la reserva.", error: error.message });
  }
};


// Obtener reservas de un usuario
exports.getReservasByUsuario = async (req, res) => {
  const userId = req.user.id;

  try {
    const reservas = await Reserva.find({ idUsuario: userId }).populate("idPresentacion");
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las reservas.", error: error.message });
  }
};
