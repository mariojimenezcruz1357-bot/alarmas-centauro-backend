const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  categoria: {
    type: String,
    enum: ['alarma', 'camara', 'sensor', 'accesorio', 'otro'],
    required: true,
  },
  descripcion: String,
  precio: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  stockMinimo: {
    type: Number,
    default: 5,
  },
  proveedor: {
    nombre: String,
    contacto: String,
  },
  imagen: String,
  activo: {
    type: Boolean,
    default: true,
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

productoSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Producto', productoSchema);
