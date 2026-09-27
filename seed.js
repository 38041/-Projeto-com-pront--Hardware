require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Hardware = require('./models/Hardware');

const items = [
  {
    hardware: 'Notebook',
    marca: 'Dell',
    modelo: 'Inspiron 15',
    preco: 3499.9,
    foto: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80'
  },
  {
    hardware: 'Smartphone',
    marca: 'Samsung',
    modelo: 'Galaxy S',
    preco: 2999.9,
    foto: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80'
  },
  {
    hardware: 'Monitor',
    marca: 'LG',
    modelo: 'UltraGear',
    preco: 1899.9,
    foto: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80'
  }
];

(async () => {
  try {
    await connectDB();
    await Hardware.deleteMany({});
    await Hardware.insertMany(items);
    console.log('3 hardwares cadastrados com sucesso.');
  } catch (error) {
    console.error('Erro no seed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
