const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  telefono: {
    type: String,
    required: true,
    trim: true,
  },
  direccion: {
    calle: String,
    ciudad: String,
    provincia: String,
    codigoPostal: String,
  },
  tipoCliente: {
    type: String,
    enum: ['particular', 'empresa', 'comunidad'],
    default: 'particular',
  },
  estado: {
    type: String,
    enum: ['potencial', 'activo', 'mantenimiento', 'inactivo'],
    default: 'potencial',
  },
  origen: {
    type: String,
    enum: ['web', 'telefono', 'recomendacion', 'publicidad', 'otro'],
    default: 'web',
  },
  notas: [
    {
      texto: String,
      fecha: {
        type: Date,
        default: Date.now,
      },
      usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  serviciosContratados: [
    {
      tipo: {
        type: String,
        enum: ['alarma', 'camara', 'mantenimiento', 'otro'],
      },
      descripcion: String,
      fechaInstalacion: Date,
      activo: {
        type: Boolean,
        default: true,
      },
    },
  ],
  valorTotal: {
    type: Number,
    default: 0,
  },
  ultimoContacto: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Actualizar fecha de modificación
clienteSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Cliente', clienteSchema);
