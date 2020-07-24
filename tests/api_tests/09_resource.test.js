/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/server');
const truncate = require('./truncate');

describe('Resource', () => {
  beforeEach(async () => {
    await truncate();
  });

  describe('Create', () => {
    it('1. should create a new resource', async (done) => {
      const res = await request(app)
        .post('/api/resource/create')
        .send({
          name: 'nameTitlecase',
          email: 'g.c.dann@gmail.com',
          contactNumber: '123231313',
          address: 'some stupid long sentense to fill up all the space yoooo',
          comment: 'some stupid long sentense to fill up all the space',
          type: 'resource provide',
          help: 'some stupid long sentense to fill up all the space.some stupid long sentense to fill up all the space',
        });
      expect(res.statusCode).toEqual(200);

      done();
    });
    it('2. should throw an error if name is empty', async (done) => {
      const res = await request(app)
        .post('/api/feedback/create')
        .send({
          name: '',
          email: 'g.c.dann@gmail.com',
          contactNumber: '123231313',
          address: 'some stupid long sentense to fill up all the spaceyoooooooooooooooooooo',
          comment: 'some stupid long sentense to fill up all the space',
          type: 'resource provide',
          help: 'some stupid long sentense to fill up all the space.some stupid long sentense to fill up all the space',
        });
      expect(res.statusCode).toEqual(400);

      done();
    });


    it('3. should create a resource even if address is null', async (done) => {
      const res = await request(app)
        .post('/api/resource/create')
        .send({
          name: 'nameTitlecase',
          email: 'g.c.dann@gmail.com',
          contactNumber: '123231313',
          address: null,
          comment: 'some stupid long sentense to fill up all the space',
          type: 'resource provide',
          help: 'some stupid long sentense to fill up all the space.some stupid long sentense to fill up all the space',
        });
      expect(res.statusCode).toEqual(200);

      done();
    });

    it('4. should throw an error if email is empty', async (done) => {
      const res = await request(app)
        .post('/api/feedback/create')
        .send({
          name: 'nameTitlecase',
          email: '',
          contactNumber: '123231313',
          address: 'some stupid long sentense to fill up all the spaceyoooooooooooooooooooo',
          comment: 'some stupid long sentense to fill up all the space',
          type: 'resource provide',
          help: 'some stupid long sentense to fill up all the space.some stupid long sentense to fill up all the space',
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('5. should throw an error if contact number is empty', async (done) => {
      const res = await request(app)
        .post('/api/feedback/create')
        .send({
          name: 'nameTitlecase',
          email: 'g.c.dann@gmail.com',
          contactNumber: '',
          address: 'some stupid long sentense to fill up all the spaceyoooooooooooooooooooo',
          comment: 'some stupid long sentense to fill up all the space',
          type: 'resource provide',
          help: 'some stupid long sentense to fill up all the space.some stupid long sentense to fill up all the space',
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('6. should throw an error if contact number is NaN', async (done) => {
      const res = await request(app)
        .post('/api/feedback/create')
        .send({
          name: 'nameTitlecase',
          email: 'g.c.dann@gmail.com',
          contactNumber: 'hello there',
          address: 'some stupid long sentense to fill up all the spaceyoooooooooooooooooooo',
          comment: 'some stupid long sentense to fill up all the space',
          type: 'resource provide',
          help: 'some stupid long sentense to fill up all the space.some stupid long sentense to fill up all the space',
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('7. should throw an error if type is empty', async (done) => {
      const res = await request(app)
        .post('/api/feedback/create')
        .send({
          name: 'nameTitlecase',
          email: 'g.c.dann@gmail.com',
          contactNumber: '123454567890',
          address: 'some stupid long sentense to fill up all the spaceyoooooooooooooooooooo',
          comment: 'some stupid long sentense to fill up all the space',
          type: '',
          help: 'some stupid long sentense to fill up all the space.some stupid long sentense to fill up all the space',
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('8. should create a resource even if comment is null', async (done) => {
      const res = await request(app)
        .post('/api/resource/create')
        .send({
          name: 'nameTitlecase',
          email: 'g.c.dann@gmail.com',
          contactNumber: '123231313',
          address: 'some address',
          comment: '',
          type: 'resource provide',
          help: 'some stupid long sentense to fill up all the space.some stupid long sentense to fill up all the space',
        });
      expect(res.statusCode).toEqual(200);

      done();
    });

    it('9. should create a resource even if help is null', async (done) => {
      const res = await request(app)
        .post('/api/resource/create')
        .send({
          name: 'nameTitlecase',
          email: 'g.c.dann@gmail.com',
          contactNumber: '123231313',
          address: 'some address',
          comment: 'some stupid long sentense to fill up all the space',
          type: 'resource provide',
          help: '',
        });
      expect(res.statusCode).toEqual(200);

      done();
    });
  });

  describe('List', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/resource/create')
        .send({
          name: 'nameTitlecase',
          email: 'g.c.dann@gmail.com',
          contactNumber: '123231313',
          address: 'some stupid long sentense to fill up all the space yoooo',
          comment: 'some stupid long sentense to fill up all the space',
          type: 'resource provide',
          help: 'some stupid long sentense to fill up all the space.some stupid long sentense to fill up all the space',
        });
    });

    it('1. should list all resource persons', async (done) => {
      const res = await request(app)
        .get('/api/resource/list');

      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(1);
      done();
    });
  });
});
