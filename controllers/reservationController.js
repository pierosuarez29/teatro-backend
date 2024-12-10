const Reservation = require("../models/Reservation");
const Event = require("../models/Event");

exports.createReservation = async (req, res) => {
  const { eventId, seatsReserved } = req.body;
  const userId = req.user.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Evento no encontrado." });

    if (event.availableSeats < seatsReserved) {
      return res.status(400).json({ message: "No hay suficientes asientos disponibles." });
    }

    const reservation = new Reservation({ eventId, userId, seatsReserved, status: "pending" });
    await reservation.save();

    event.availableSeats -= seatsReserved;
    await event.save();

    res.status(201).json({ message: "Reserva creada exitosamente.", reservation });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la reserva.", error: error.message });
  }
};

exports.getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.user.id }).populate("eventId");
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las reservas.", error: error.message });
  }
};
