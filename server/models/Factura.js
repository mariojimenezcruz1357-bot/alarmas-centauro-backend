const mongoose = require('mongoose');

const facturaSchema = new mongoose.Schema({
  numero: {
    type: String,
    required: true,
    unique: true,
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true,
  },
  tipo: {
    type: String,
    enum: ['presupuesto', 'factura'],
    default: 'presupuesto',
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  vencimiento: Date,
  items: [
    {
      descripcion: String,
      cantidad: {
        type: Number,
        default: 1,
      },
      precioUnitario: Number,
      subtotal: Number,
    },
  ],
  subtotal: {
    type: Number,
    default: 0,
  },
  iva: {
    type: Number,
    default: 21,
  },
  total: {
    type: Number,
    required: true,
  },
  estado: {
    type: String,
    enum: ['borrador', 'enviado', 'aceptado', 'rechazado', 'pagado', 'vencido'],
    default: 'borrador',
  },
  metodoPago: {
    type: String,
    enum: ['efectivo', 'transferencia', 'tarjeta', 'otro'],
  },
  fechaPago: Date,
  notas: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

facturaSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Factura', facturaSchema);
