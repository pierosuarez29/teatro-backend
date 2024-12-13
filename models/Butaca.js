const mongoose = require('mongoose');

const butacaSchema = new mongoose.Schema({
    idPresentacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Presentacion', required: true },
    fila: { type: String, required: true },
    columna: { type: Number, required: true },
    estado: { type: String, enum: ['disponible', 'reservado'], default: 'disponible' },
});

module.exports = mongoose.model('Butaca', butacaSchema);
