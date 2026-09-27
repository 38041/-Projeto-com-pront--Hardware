const mongoose = require('mongoose');

const hardwareSchema = new mongoose.Schema(
  {
    hardware: {
      type: String,
      required: [true, 'Hardware é obrigatório.'],
      trim: true
    },
    marca: {
      type: String,
      required: [true, 'Marca é obrigatória.'],
      trim: true
    },
    modelo: {
      type: String,
      required: [true, 'Modelo é obrigatório.'],
      trim: true
    },
    preco: {
      type: Number,
      required: [true, 'Preço é obrigatório.'],
      min: [0, 'Preço não pode ser negativo.']
    },
    foto: {
      type: String,
      required: [true, 'Foto é obrigatória.'],
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Hardware || mongoose.model('Hardware', hardwareSchema);
