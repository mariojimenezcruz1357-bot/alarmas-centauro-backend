const express = require('express');
const router = express.Router();
const {
  getCitas,
  getCitaById,
  createCita,
  updateCita,
  deleteCita,
  getCitasByDateRange,
} = require('../controllers/citaController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getCitas)
  .post(protect, createCita);

router.get('/rango', protect, getCitasByDateRange);

router.route('/:id')
  .get(protect, getCitaById)
  .put(protect, updateCita)
  .delete(protect, admin, deleteCita);

module.exports = router;
