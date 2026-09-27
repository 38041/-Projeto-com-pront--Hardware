const mongoose = require('mongoose');
const Hardware = require('../models/Hardware');

function invalidId(id) {
  return !mongoose.Types.ObjectId.isValid(id);
}

function normalizePayload(body = {}) {
  return {
    hardware: body.hardware,
    marca: body.marca,
    modelo: body.modelo,
    preco: body.preco,
    foto: body.foto
  };
}

function validatePayload(payload, partial = false) {
  const required = ['hardware', 'marca', 'modelo', 'preco', 'foto'];
  if (!partial) {
    const missing = required.filter((field) => payload[field] === undefined || payload[field] === null || payload[field] === '');
    if (missing.length) return `Campos obrigatórios ausentes: ${missing.join(', ')}.`;
  }

  if (payload.preco !== undefined) {
    const value = Number(payload.preco);
    if (!Number.isFinite(value) || value < 0) return 'Preço inválido. Informe um número maior ou igual a zero.';
    payload.preco = value;
  }

  return null;
}

exports.list = async (req, res, next) => {
  try {
    const items = await Hardware.find().sort({ createdAt: -1 });
    return res.status(200).json(items);
  } catch (error) {
    return next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    if (invalidId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'ID inválido.' });
    }
    const item = await Hardware.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Hardware não encontrado.' });
    return res.status(200).json(item);
  } catch (error) {
    return next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const payload = normalizePayload(req.body);
    const errorMessage = validatePayload(payload, false);
    if (errorMessage) return res.status(400).json({ success: false, message: errorMessage });

    const item = await Hardware.create(payload);
    return res.status(201).json(item);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: error.message });
    }
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    if (invalidId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'ID inválido.' });
    }

    const payload = normalizePayload(req.body);
    Object.keys(payload).forEach((key) => payload[key] === undefined && delete payload[key]);
    const errorMessage = validatePayload(payload, true);
    if (errorMessage) return res.status(400).json({ success: false, message: errorMessage });

    const item = await Hardware.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true
    });
    if (!item) return res.status(404).json({ success: false, message: 'Hardware não encontrado.' });
    return res.status(200).json(item);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: error.message });
    }
    return next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    if (invalidId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'ID inválido.' });
    }
    const item = await Hardware.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Hardware não encontrado.' });
    return res.status(200).json({ success: true, message: 'Hardware excluído com sucesso.' });
  } catch (error) {
    return next(error);
  }
};
