const Contacto = require('../models/Contacto');
const { enviarRespuesta } = require('../services/emailService');

// @desc    Obtener todos los contactos
// @route   GET /api/contactos
// @access  Private
const getContactos = async (req, res) => {
  try {
    const { estado, prioridad } = req.query;
    let query = {};

    if (estado) {
      query.estado = estado;
    }

    if (prioridad) {
      query.prioridad = prioridad;
    }

    const contactos = await Contacto.find(query)
      .populate('respondidoPor', 'nombre email')
      .sort({ createdAt: -1 });

    res.json(contactos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener contactos', error: error.message });
  }
};

// @desc    Obtener un contacto por ID
// @route   GET /api/contactos/:id
// @access  Private
const getContactoById = async (req, res) => {
  try {
    const contacto = await Contacto.findById(req.params.id)
      .populate('respondidoPor', 'nombre email');

    if (!contacto) {
      return res.status(404).json({ message: 'Contacto no encontrado' });
    }

    res.json(contacto);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener contacto', error: error.message });
  }
};

// @desc    Crear nuevo contacto (público)
// @route   POST /api/contactos
// @access  Public
const createContacto = async (req, res) => {
  try {
    const { nombre, email, telefono, asunto, mensaje } = req.body;

    const contacto = await Contacto.create({
      nombre,
      email,
      telefono,
      asunto,
      mensaje,
      origen: 'web',
    });

    res.status(201).json(contacto);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear contacto', error: error.message });
  }
};

// @desc    Actualizar estado de contacto
// @route   PUT /api/contactos/:id/estado
// @access  Private
const updateEstadoContacto = async (req, res) => {
  try {
    const { estado } = req.body;

    const contacto = await Contacto.findById(req.params.id);

    if (!contacto) {
      return res.status(404).json({ message: 'Contacto no encontrado' });
    }

    contacto.estado = estado;

    // Si se marca como respondido, guardar fecha y usuario
    if (estado === 'respondido' && contacto.estado !== 'respondido') {
      contacto.fechaRespuesta = new Date();
      contacto.respondidoPor = req.user._id;
    }

    await contacto.save();

    res.json(contacto);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar estado', error: error.message });
  }
};

// @desc    Responder contacto
// @route   PUT /api/contactos/:id/responder
// @access  Private
const responderContacto = async (req, res) => {
  try {
    const { respuesta, notas } = req.body;

    const contacto = await Contacto.findById(req.params.id);

    if (!contacto) {
      return res.status(404).json({ message: 'Contacto no encontrado' });
    }

    contacto.respuesta = respuesta;
    if (notas) {
      contacto.notas = notas;
    }
    contacto.estado = 'respondido';
    contacto.fechaRespuesta = new Date();
    contacto.respondidoPor = req.user._id;

    await contacto.save();

    // Enviar email al cliente con la respuesta
    const emailResult = await enviarRespuesta(contacto, respuesta);
    
    if (emailResult.success) {
      console.log('✅ Email enviado correctamente al cliente');
    } else {
      console.warn('⚠️ No se pudo enviar el email:', emailResult.error);
    }

    res.json(contacto);
  } catch (error) {
    res.status(400).json({ message: 'Error al responder contacto', error: error.message });
  }
};

// @desc    Actualizar prioridad de contacto
// @route   PUT /api/contactos/:id/prioridad
// @access  Private
const updatePrioridadContacto = async (req, res) => {
  try {
    const { prioridad } = req.body;

    const contacto = await Contacto.findById(req.params.id);

    if (!contacto) {
      return res.status(404).json({ message: 'Contacto no encontrado' });
    }

    contacto.prioridad = prioridad;
    await contacto.save();

    res.json(contacto);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar prioridad', error: error.message });
  }
};

// @desc    Eliminar contacto
// @route   DELETE /api/contactos/:id
// @access  Private (Admin only)
const deleteContacto = async (req, res) => {
  try {
    const contacto = await Contacto.findById(req.params.id);

    if (!contacto) {
      return res.status(404).json({ message: 'Contacto no encontrado' });
    }

    await contacto.deleteOne();
    res.json({ message: 'Contacto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar contacto', error: error.message });
  }
};

module.exports = {
  getContactos,
  getContactoById,
  createContacto,
  updateEstadoContacto,
  responderContacto,
  updatePrioridadContacto,
  deleteContacto,
};
