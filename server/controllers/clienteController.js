const Cliente = require('../models/Cliente');

// @desc    Obtener todos los clientes
// @route   GET /api/clientes
// @access  Private
const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find().sort({ createdAt: -1 });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Obtener un cliente por ID
// @route   GET /api/clientes/:id
// @access  Private
const getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Crear nuevo cliente
// @route   POST /api/clientes
// @access  Private
const createCliente = async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Actualizar cliente
// @route   PUT /api/clientes/:id
// @access  Private
const updateCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Eliminar cliente
// @route   DELETE /api/clientes/:id
// @access  Private/Admin
const deleteCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    
    if (cliente) {
      res.json({ message: 'Cliente eliminado' });
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Agregar nota a cliente
// @route   POST /api/clientes/:id/notas
// @access  Private
const addNotaCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    
    if (cliente) {
      const nota = {
        texto: req.body.texto,
        usuario: req.user._id,
      };
      
      cliente.notas.push(nota);
      cliente.ultimoContacto = Date.now();
      
      await cliente.save();
      res.json(cliente);
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
  addNotaCliente,
};
