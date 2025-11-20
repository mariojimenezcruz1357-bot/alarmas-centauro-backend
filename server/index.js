require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const citaRoutes = require('./routes/citaRoutes');
const productoRoutes = require('./routes/productoRoutes');
const contactoRoutes = require('./routes/contactoRoutes');

// Conectar a la base de datos
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Permitir todas las solicitudes para desarrollo
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/api', (req, res) => {
  res.json({ message: '🚀 API Alarmas Centauro - Sistema de Gestión' });
});

app.use('/api/auth', authRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/citas', citaRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/contactos', contactoRoutes);

// Ruta para recibir leads desde la web pública
app.post('/api/leads', async (req, res) => {
  try {
    const Cliente = require('./models/Cliente');
    
    const nuevoCliente = await Cliente.create({
      nombre: req.body.nombre,
      email: req.body.email,
      telefono: req.body.telefono,
      direccion: {
        calle: req.body.direccion || '',
      },
      estado: 'potencial',
      origen: 'web',
      notas: [
        {
          texto: `Mensaje desde web: ${req.body.mensaje || 'Sin mensaje'}`,
          fecha: new Date(),
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: 'Lead registrado correctamente',
      cliente: nuevoCliente,
    });
  } catch (error) {
    console.error('Error al crear lead:', error);
    res.status(500).json({
      success: false,
      message: 'Error al registrar el lead',
    });
  }
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
  console.log(`🌐 API disponible en http://localhost:${PORT}/api`);
  console.log(`📱 Acceso red local: http://192.168.0.210:${PORT}/api`);
});
