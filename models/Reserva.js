const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
    idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    idPresentacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Presentacion', required: true },
    fechaReserva: { type: Date, default: Date.now },
    estado: { type: String, enum: ['pendiente', 'aceptada'], default: 'pendiente' },
    totalPago: { type: Number, required: true },
    butacas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Butaca' }],
});

module.exports = mongoose.model('Reserva', reservaSchema);
