const mongoose = require('mongoose');

const contactoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    trim: true,
    lowercase: true,
  },
  telefono: {
    type: String,
    required: [true, 'El teléfono es requerido'],
    trim: true,
  },
  asunto: {
    type: String,
    required: [true, 'El asunto es requerido'],
    trim: true,
  },
  mensaje: {
    type: String,
    required: [true, 'El mensaje es requerido'],
  },
  estado: {
    type: String,
    enum: ['pendiente', 'respondido', 'archivado'],
    default: 'pendiente',
  },
  prioridad: {
    type: String,
    enum: ['baja', 'media', 'alta'],
    default: 'media',
  },
  respuesta: {
    type: String,
    default: '',
  },
  respondidoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  fechaRespuesta: {
    type: Date,
  },
  origen: {
    type: String,
    default: 'web',
  },
  notas: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

// Índices para búsquedas rápidas
contactoSchema.index({ email: 1 });
contactoSchema.index({ estado: 1 });
contactoSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Contacto', contactoSchema);
