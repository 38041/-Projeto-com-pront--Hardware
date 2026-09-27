const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const hardwareRoutes = require('./routes/hardwareRoutes');

const app = express();

const allowedOrigin = process.env.FRONTEND_URL;
app.use(cors({ origin: allowedOrigin ? [allowedOrigin, 'http://localhost:5500', 'http://127.0.0.1:5500'] : true }));
app.use(express.json({ limit: '1mb' }));

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Erro ao conectar no MongoDB:', error.message);
    res.status(500).json({ success: false, message: 'Erro de conexão com o banco de dados.' });
  }
});

app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'API Gerenciador de Hardware online.' });
});

app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    routes: ['/api/hardwares', '/api/hardwares/:id']
  });
});

app.use('/api/hardwares', hardwareRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Rota não encontrada.' });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
});

module.exports = app;
