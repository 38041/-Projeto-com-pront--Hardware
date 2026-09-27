process.env.NODE_ENV = 'test';

const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;
let app;
let Hardware;

async function createItem(overrides = {}) {
  return Hardware.create({
    hardware: 'Notebook',
    marca: 'Dell',
    modelo: 'Inspiron 15',
    preco: 3499.9,
    foto: 'https://example.com/notebook.jpg',
    ...overrides
  });
}

test.before(async () => {
  mongod = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongod.getUri();
  delete require.cache[require.resolve('../app')];
  app = require('../app');
  Hardware = require('../models/Hardware');
  await mongoose.connection.asPromise();
});

test.beforeEach(async () => {
  await Hardware.deleteMany({});
});

test.after(async () => {
  await mongoose.disconnect();
  if (mongod) await mongod.stop();
});

test('GET / retorna status 200', async () => {
  const response = await request(app).get('/');
  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
});

test('POST cria hardware válido', async () => {
  const response = await request(app).post('/api/hardwares').send({
    hardware: 'Monitor',
    marca: 'LG',
    modelo: 'UltraGear',
    preco: 1899.9,
    foto: 'https://example.com/monitor.jpg'
  });
  assert.equal(response.status, 201);
  assert.equal(response.body.marca, 'LG');
});

test('POST rejeita campos faltando', async () => {
  const response = await request(app).post('/api/hardwares').send({ hardware: 'Monitor' });
  assert.equal(response.status, 400);
});

test('POST rejeita preço negativo', async () => {
  const response = await request(app).post('/api/hardwares').send({
    hardware: 'Monitor', marca: 'LG', modelo: 'X', preco: -1, foto: 'https://example.com/x.jpg'
  });
  assert.equal(response.status, 400);
});

test('GET lista itens', async () => {
  await createItem();
  const response = await request(app).get('/api/hardwares');
  assert.equal(response.status, 200);
  assert.equal(response.body.length, 1);
});

test('GET por ID retorna 400 para ID inválido', async () => {
  const response = await request(app).get('/api/hardwares/abc');
  assert.equal(response.status, 400);
});

test('GET por ID retorna 404 quando não existe', async () => {
  const id = new mongoose.Types.ObjectId().toString();
  const response = await request(app).get(`/api/hardwares/${id}`);
  assert.equal(response.status, 404);
});

test('PUT atualiza item', async () => {
  const item = await createItem();
  const response = await request(app).put(`/api/hardwares/${item._id}`).send({ preco: 3999.9 });
  assert.equal(response.status, 200);
  assert.equal(response.body.preco, 3999.9);
});

test('DELETE remove item', async () => {
  const item = await createItem();
  const response = await request(app).delete(`/api/hardwares/${item._id}`);
  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
});
