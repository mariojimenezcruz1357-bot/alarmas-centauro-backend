const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true,
  },
  tecnico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  tipo: {
    type: String,
    enum: ['instalacion', 'mantenimiento', 'reparacion', 'visita', 'otro'],
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  descripcion: String,
  fechaInicio: {
    type: Date,
    required: true,
  },
  fechaFin: {
    type: Date,
    required: true,
  },
  estado: {
    type: String,
    enum: ['pendiente', 'en_progreso', 'completada', 'cancelada'],
    default: 'pendiente',
  },
  prioridad: {
    type: String,
    enum: ['baja', 'media', 'alta', 'urgente'],
    default: 'media',
  },
  ubicacion: {
    direccion: String,
    coordenadas: {
      lat: Number,
      lng: Number,
    },
  },
  materiales: [
    {
      producto: String,
      cantidad: Number,
    },
  ],
  notas: String,
  resultado: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

citaSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Cita', citaSchema);
