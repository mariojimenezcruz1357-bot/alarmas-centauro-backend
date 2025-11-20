// Script para crear un usuario administrador inicial
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error de conexión:', error);
    process.exit(1);
  }
};

const createAdmin = async () => {
  await connectDB();

  try {
    // Verificar si ya existe un admin
    const existingAdmin = await User.findOne({ email: 'admin@centauro.com' });

    if (existingAdmin) {
      console.log('⚠️  El usuario admin ya existe');
      console.log('📧 Email: admin@centauro.com');
      console.log('🔑 Contraseña: admin123');
      process.exit(0);
    }

    // Crear usuario admin
    const admin = await User.create({
      nombre: 'Administrador',
      email: 'admin@centauro.com',
      password: 'admin123',
      role: 'admin',
      telefono: '667942136',
    });

    console.log('✅ Usuario administrador creado con éxito!');
    console.log('');
    console.log('📧 Email:', admin.email);
    console.log('🔑 Contraseña: admin123');
    console.log('👤 Rol:', admin.role);
    console.log('');
    console.log('🚀 Ya puedes iniciar sesión en: http://localhost:3000/admin/login');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear admin:', error);
    process.exit(1);
  }
};

createAdmin();
