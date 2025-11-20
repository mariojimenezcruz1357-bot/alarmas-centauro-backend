const express = require('express');
const router = express.Router();
const {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
  addNotaCliente,
} = require('../controllers/clienteController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getClientes)
  .post(protect, createCliente);

router.route('/:id')
  .get(protect, getClienteById)
  .put(protect, updateCliente)
  .delete(protect, admin, deleteCliente);

router.post('/:id/notas', protect, addNotaCliente);

module.exports = router;
