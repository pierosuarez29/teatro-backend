const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
    idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    idPresentacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Presentacion', required: true },
    comentario: { type: String, required: true },
    fechaComentario: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comentario', comentarioSchema);
