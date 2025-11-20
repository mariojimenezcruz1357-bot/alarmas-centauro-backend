const Cita = require('../models/Cita');

// @desc    Obtener todas las citas
// @route   GET /api/citas
// @access  Private
const getCitas = async (req, res) => {
  try {
    const citas = await Cita.find()
      .populate('cliente', 'nombre email telefono')
      .populate('tecnico', 'nombre email')
      .sort({ fechaInicio: -1 });
    res.json(citas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Obtener una cita por ID
// @route   GET /api/citas/:id
// @access  Private
const getCitaById = async (req, res) => {
  try {
    const cita = await Cita.findById(req.params.id)
      .populate('cliente')
      .populate('tecnico');
    if (cita) {
      res.json(cita);
    } else {
      res.status(404).json({ message: 'Cita no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Crear nueva cita
// @route   POST /api/citas
// @access  Private
const createCita = async (req, res) => {
  try {
    const cita = await Cita.create(req.body);
    const citaPopulada = await Cita.findById(cita._id)
      .populate('cliente')
      .populate('tecnico');
    res.status(201).json(citaPopulada);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Actualizar cita
// @route   PUT /api/citas/:id
// @access  Private
const updateCita = async (req, res) => {
  try {
    const cita = await Cita.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('cliente').populate('tecnico');
    
    if (cita) {
      res.json(cita);
    } else {
      res.status(404).json({ message: 'Cita no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Eliminar cita
// @route   DELETE /api/citas/:id
// @access  Private/Admin
const deleteCita = async (req, res) => {
  try {
    const cita = await Cita.findByIdAndDelete(req.params.id);
    
    if (cita) {
      res.json({ message: 'Cita eliminada' });
    } else {
      res.status(404).json({ message: 'Cita no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Obtener citas por rango de fechas
// @route   GET /api/citas/rango
// @access  Private
const getCitasByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const citas = await Cita.find({
      fechaInicio: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).populate('cliente').populate('tecnico');
    
    res.json(citas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCitas,
  getCitaById,
  createCita,
  updateCita,
  deleteCita,
  getCitasByDateRange,
};
