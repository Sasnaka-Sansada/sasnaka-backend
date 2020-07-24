/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/server');
const truncate = require('./truncate');

describe('Feedback', () => {
  beforeEach(async () => {
    await truncate();
  });

  describe('Create', () => {
    it('1. should create a new feedback', async (done) => {
      const res = await request(app)
        .post('/api/feedback/create')
        .send({
          name: 'Gayal',
          email: 'noemail@gmail.com',
          message: 'Hello there',
          visible: false,
        });
      expect(res.statusCode).toEqual(200);

      done();
    });
    it('2. should throw an error if name is empty', async (done) => {
      const res = await request(app)
        .post('/api/feedback/create')
        .send({
          name: '',
          email: 'noemail@gmail.com',
          message: 'Hello there',
          visible: false,
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('3. should throw an error if email is empty', async (done) => {
      const res = await request(app)
        .post('/api/feedback/create')
        .send({
          name: 'Gayal',
          email: '',
          message: 'Hello there',
          visible: false,
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('4. should throw an error if message is empty', async (done) => {
      const res = await request(app)
        .post('/api/feedback/create')
        .send({
          name: 'Gayal',
          email: 'noemail@gmail.com',
          message: '',
          visible: false,
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('5. should throw an error if visible is empty', async (done) => {
      const res = await request(app)
        .post('/api/feedback/create')
        .send({
          name: 'Gayal',
          email: '',
          message: 'Hello there',
          visible: null,
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('6. should throw an error if email is in an invalid format', async (done) => {
      const res = await request(app)
        .post('/api/feedback/create')
        .send({
          name: 'Gayal',
          email: 'noemail@wrongformat',
          message: 'Hello there',
          visible: false,
        });
      expect(res.statusCode).toEqual(400);

      done();
    });
  });

  describe('Update', () => {
    let feedbackres;
    beforeEach(async () => {
      feedbackres = await request(app)
        .post('/api/feedback/create')
        .send({
          name: 'Gayal',
          email: 'noemail@gmail.com',
          message: 'Hello there',
          visible: false,
        });
    });

    it('1. should update a feedback', async (done) => {
      const res = await request(app)
        .put(`/api/feedback/${feedbackres.body.id}`)
        .send({
          name: 'Gayal',
          email: 'noemail@gmail.com',
          message: 'Hello there',
          visible: false,
        });
      expect(res.statusCode).toEqual(200);

      done();
    });
    it('2. should throw an error if feedback id is incorrect', async (done) => {
      const res = await request(app)
        .put('/api/feedback/2de679ab-b4b7-40ca-806a-740c8626613e')
        .send({
          name: 'Gayal',
          email: 'noemail@gmail.com',
          message: 'Hello there',
          visible: false,
        });
      expect(res.statusCode).toEqual(400);

      done();
    });
    it('3. should throw an error if name is empty', async (done) => {
      const res = await request(app)
        .put(`/api/feedback/${feedbackres.body.id}`)
        .send({
          name: '',
          email: 'noemail@gmail.com',
          message: 'Hello there',
          visible: false,
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('4. should throw an error if email is empty', async (done) => {
      const res = await request(app)
        .put(`/api/feedback/${feedbackres.body.id}`)
        .send({
          name: 'Gayal',
          email: '',
          message: 'Hello there',
          visible: false,
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('5. should throw an error if message is empty', async (done) => {
      const res = await request(app)
        .put(`/api/feedback/${feedbackres.body.id}`)
        .send({
          name: 'Gayal',
          email: 'noemail@gmail.com',
          message: '',
          visible: false,
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('6. should throw an error if visible is empty', async (done) => {
      const res = await request(app)
        .put(`/api/feedback/${feedbackres.body.id}`)
        .send({
          name: 'Gayal',
          email: '',
          message: 'Hello there',
          visible: null,
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('7. should throw an error if email is in an invalid format', async (done) => {
      const res = await request(app)
        .put(`/api/feedback/${feedbackres.body.id}`)
        .send({
          name: 'Gayal',
          email: 'noemail@wrongformat',
          message: 'Hello there',
          visible: false,
        });
      expect(res.statusCode).toEqual(400);

      done();
    });
  });

  describe('List', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/feedback/create')
        .send({
          name: 'Gayal',
          email: 'noemail@gmail.com',
          message: 'Hello there',
          visible: false,
        });
    });

    it('1. lists all feedbacks', async (done) => {
      const res = await request(app)
        .get('/api/feedback/list');

      expect(res.statusCode).toEqual(200);

      done();
    });
  });

  describe('List/visible', () => {
    it('1. should list all visible ', async (done) => {
      await request(app)
        .post('/api/feedback/create')
        .send({
          name: 'Gayal',
          email: 'noemail@gmail.com',
          message: 'Hello there',
          visible: false,
        });
      await request(app)
        .post('/api/feedback/create')
        .send({
          name: 'Gayal',
          email: 'noemail@gmail.com',
          message: 'Hello there',
          visible: true,
        });

      const res = await request(app)
        .get('/api/feedback/list/visible');

      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(1);

      done();
    });
  });
});
