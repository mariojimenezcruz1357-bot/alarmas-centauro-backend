const express = require('express');
const router = express.Router();
const {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  getProductosStockBajo,
} = require('../controllers/productoController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getProductos)
  .post(protect, createProducto);

router.get('/stock-bajo', protect, getProductosStockBajo);

router.route('/:id')
  .get(protect, getProductoById)
  .put(protect, updateProducto)
  .delete(protect, admin, deleteProducto);

module.exports = router;
