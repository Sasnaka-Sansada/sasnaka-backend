/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/server');
const truncate = require('./truncate');

describe('Feedback', () => {
  beforeEach(async () => {
    await truncate();
  });
  describe('Create', () => {
    it('1. should create a new feedback and', async (done) => {
      const res = await request(app)
        .post('/api/feedback/create')
        .send({
          name: 'Gayal',
          email: 'noemail@gmail.com',
          message: 'Hello there',
          visible: false,
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('email');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('visible');
      expect(res.body.name).toEqual('Gayal');
      expect(res.body.email).toEqual('noemail@gmail.com');
      expect(res.body.message).toEqual('Hello there');
      expect(res.body.visible).toEqual(false);
      done();
    });
    it('2. should throw an error if name is not provided', async (done) => {
      const res = await request(app)
        .post('/api/feedback/create')
        .send({
          email: 'noemail@gmail.com',
          message: 'Hello there',
          visible: false,
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
      done();
    });
    it('3. should throw an error if email is not provided', async (done) => {
      const res = await request(app)
        .post('/api/feedback/create')
        .send({
          name: 'Gayal',
          message: 'Hello there',
          visible: false,
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
      done();
    });
    it('4. should throw an error if message is not provided', async (done) => {
      const res = await request(app)
        .post('/api/feedback/create')
        .send({
          name: 'Gayal',
          email: 'noemail@gmail.com',
          visible: false,
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
      done();
    });
    it('5. should throw an error if visible is not provided', async (done) => {
      const res = await request(app)
        .post('/api/feedback/create')
        .send({
          name: 'Gayal',
          email: 'noemail@gmail.com',
          message: 'Hello there',
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
      done();
    });
    it('6. should throw an error if name is null', async (done) => {
      const res = await request(app)
        .post('/api/feedback/create')
        .send({
          name: null,
          email: 'noemail@gmail.com',
          message: 'Hello there',
          visible: false,
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
      done();
    });
  });
  describe('List', () => {
    it('1. should list all feedbacks', async (done) => {
      const createRes = await request(app)
        .post('/api/feedback/create')
        .send({
          name: 'Gayal',
          email: 'noemail@gmail.com',
          message: 'Hello there',
          visible: false,
        });
      const res = await request(app)
        .get('/api/feedback/list')
        .send();
      expect(res.statusCode).toEqual(200);
      expect(res.body).toContainEqual(createRes.body);
      done();
    });
  });
});
