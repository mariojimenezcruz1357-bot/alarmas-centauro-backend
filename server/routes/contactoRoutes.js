const express = require('express');
const router = express.Router();
const {
  getContactos,
  getContactoById,
  createContacto,
  updateEstadoContacto,
  responderContacto,
  updatePrioridadContacto,
  deleteContacto,
} = require('../controllers/contactoController');
const { protect, admin } = require('../middleware/authMiddleware');

// Ruta pública para crear contacto desde el formulario web
router.post('/', createContacto);

// Rutas protegidas
router.get('/', protect, getContactos);
router.get('/:id', protect, getContactoById);
router.put('/:id/estado', protect, updateEstadoContacto);
router.put('/:id/responder', protect, responderContacto);
router.put('/:id/prioridad', protect, updatePrioridadContacto);
router.delete('/:id', protect, admin, deleteContacto);

module.exports = router;
