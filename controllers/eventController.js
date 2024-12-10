const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  const { title, description, date, time, location, availableSeats } = req.body;

  try {
    const newEvent = new Event({ title, description, date, time, location, availableSeats });
    await newEvent.save();

    res.status(201).json({ message: "Evento creado exitosamente.", event: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el evento.", error: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los eventos.", error: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Evento no encontrado." });

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el evento.", error: error.message });
  }
};
