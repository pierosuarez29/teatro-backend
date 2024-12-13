const mongoose = require('mongoose');

const presentacionSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  fechaHora: { type: Date, required: true },
  lugar: { type: String, required: true },
  precioButaca: { type: Number, required: true },
  totalAsientos: { type: Number, required: true },
  asientosDisponibles: { type: Number, required: true },
});

module.exports = mongoose.model('Presentacion', presentacionSchema);
