/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/server');
const truncate = require('./truncate');

describe('Event', () => {
  let projectres;

  beforeEach(async () => {
    await truncate();
    projectres = await request(app)
      .post('/api/project/create')
      .send({
        header: 'header23',
        subHeader: 'some string',
        translatedHeader: 'නම',
        introduction: 'some string2',
        objective: 'not empty',
        process: 'blah blah',
        thumbnailDescription: 'some description',
        pillerId: 'LEADERSHIP_GROOMING',
        introductionImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
        objectiveImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
        processImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
        thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
      });
  });

  describe('Create', () => {
    it('1. should create a new event', async (done) => {
      const res = await request(app)
        .post('/api/event/create')
        .send({
          headerTitle: 'dsfsd',
          headerSinhalaTitle: 'නම',
          headerDescription: 'sdafdsa',
          contentDescription: 'dsfadsfad',
          thumbnailDescription: 'sdfasdf',
          thumbnailTitle: 'sdfdas',
          date: '2025-05-05',
          projectId: `${projectres.body.id}`,
          contentImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          subImages: [
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
          ],
        });
      expect(res.statusCode).toEqual(200);

      done();
    });

    it('2. should throw an error if headerTitle is empty', async (done) => {
      const res = await request(app)
        .post('/api/event/create')
        .send({
          headerTitle: '',
          headerSinhalaTitle: 'නම',
          headerDescription: 'sdafdsa',
          contentDescription: 'dsfadsfad',
          thumbnailDescription: 'sdfasdf',
          thumbnailTitle: 'sdfdas',
          date: '2025-05-05',
          projectId: `${projectres.body.id}`,
          contentImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          subImages: [
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
          ],
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('3. should create event even if headerSinhalaTitle is empty', async (done) => {
      const res = await request(app)
        .post('/api/event/create')
        .send({
          headerTitle: 'hello there',
          headerSinhalaTitle: '',
          headerDescription: 'sdafdsa',
          contentDescription: 'dsfadsfad',
          thumbnailDescription: 'sdfasdf',
          thumbnailTitle: 'sdfdas',
          date: '2025-05-05',
          projectId: `${projectres.body.id}`,
          contentImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          subImages: [
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
          ],
        });
      expect(res.statusCode).toEqual(200);

      done();
    });

    it('4. should create event even if headerDescription is empty', async (done) => {
      const res = await request(app)
        .post('/api/event/create')
        .send({
          headerTitle: 'dsfsd',
          headerSinhalaTitle: 'නම',
          headerDescription: '',
          contentDescription: 'dsfadsfad',
          thumbnailDescription: 'sdfasdf',
          thumbnailTitle: 'sdfdas',
          date: '2025-05-05',
          projectId: `${projectres.body.id}`,
          contentImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          subImages: [
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
          ],
        });
      expect(res.statusCode).toEqual(200);

      done();
    });

    it('5. should create event even if contentImage is empty', async (done) => {
      const res = await request(app)
        .post('/api/event/create')
        .send({
          headerTitle: 'dsfsd',
          headerSinhalaTitle: 'නම',
          headerDescription: 'headerDescription',
          contentDescription: 'dsfadsfad',
          thumbnailDescription: 'sdfasdf',
          thumbnailTitle: 'sdfdas',
          date: '2025-05-05',
          projectId: `${projectres.body.id}`,
          contentImage: '',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          subImages: [
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
          ],
        });
      expect(res.statusCode).toEqual(200);

      done();
    });

    it('6. should create event even if contentDescription is empty', async (done) => {
      const res = await request(app)
        .post('/api/event/create')
        .send({
          headerTitle: 'dsfsd',
          headerSinhalaTitle: 'නම',
          headerDescription: 'headerDescription',
          contentDescription: '',
          thumbnailDescription: 'sdfasdf',
          thumbnailTitle: 'sdfdas',
          date: '2025-05-05',
          projectId: `${projectres.body.id}`,
          contentImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          subImages: [
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
          ],
        });
      expect(res.statusCode).toEqual(200);

      done();
    });

    it('7. should throw an error if thumbnailImage is empty', async (done) => {
      const res = await request(app)
        .post('/api/event/create')
        .send({
          headerTitle: 'dsfsd',
          headerSinhalaTitle: 'නම',
          headerDescription: 'sdafdsa',
          contentDescription: 'dsfadsfad',
          thumbnailDescription: 'nice',
          thumbnailTitle: 'sdfdas',
          date: '2025-05-05',
          projectId: `${projectres.body.id}`,
          contentImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: '',
          subImages: [
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
          ],
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('8. should throw an error if thumbnailTitle is empty', async (done) => {
      const res = await request(app)
        .post('/api/event/create')
        .send({
          headerTitle: 'dsfsd',
          headerSinhalaTitle: 'නම',
          headerDescription: 'sdafdsa',
          contentDescription: 'dsfadsfad',
          thumbnailDescription: 'hello',
          thumbnailTitle: '',
          date: '2025-05-05',
          projectId: `${projectres.body.id}`,
          contentImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          subImages: [
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
          ],
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('9. should throw an error if date is empty', async (done) => {
      const res = await request(app)
        .post('/api/event/create')
        .send({
          headerTitle: 'dsfsd',
          headerSinhalaTitle: 'නම',
          headerDescription: 'sdafdsa',
          contentDescription: 'dsfadsfad',
          thumbnailDescription: 'dsfadsfad',
          thumbnailTitle: 'dsfadsfad',
          date: '',
          projectId: `${projectres.body.id}`,
          contentImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          subImages: [
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
          ],
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('10. should create an event even if subImages is empty', async (done) => {
      const res = await request(app)
        .post('/api/event/create')
        .send({
          headerTitle: 'dsfsd',
          headerSinhalaTitle: 'නම',
          headerDescription: 'sdafdsa',
          contentDescription: 'dsfadsfad',
          thumbnailDescription: 'dsfadsfad',
          thumbnailTitle: 'dsfadsfad',
          date: '2025-05-05',
          projectId: `${projectres.body.id}`,
          contentImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          subImages: [],
        });
      expect(res.statusCode).toEqual(200);

      done();
    });

    it('11. should throw an error if project id is incorrect', async (done) => {
      const res = await request(app)
        .post('/api/event/create')
        .send({
          headerTitle: 'dsfsd',
          headerSinhalaTitle: 'නම',
          headerDescription: 'sdafdsa',
          contentDescription: 'dsfadsfad',
          thumbnailDescription: 'dsfadsfad',
          thumbnailTitle: 'dsfadsfad',
          date: '2025-05-05',
          projectId: '2de679ab-b4b7-40ca-806a-740c8626613e',
          contentImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          subImages: [],
        });
      expect(res.statusCode).toEqual(400);

      done();
    });
  });

  describe('Get', () => {
    let eventres;

    beforeEach(async () => {
      eventres = await request(app)
        .post('/api/event/create')
        .send({
          headerTitle: 'dsfsd',
          headerSinhalaTitle: 'නම',
          headerDescription: 'sdafdsa',
          contentDescription: 'dsfadsfad',
          thumbnailDescription: 'sdfasdf',
          thumbnailTitle: 'sdfdas',
          date: '2025-05-05',
          projectId: `${projectres.body.id}`,
          contentImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          subImages: [
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
          ],
        });
    });


    it('1. should get an event', async (done) => {
      const res = await request(app)
        .get(`/api/event/${eventres.body.id}`);
      expect(res.statusCode).toEqual(200);

      done();
    });

    it('2. should throw an error if event id is wrong', async (done) => {
      const res = await request(app)
        .get('/api/event/2de679ab-b4b7-40ca-806a-740c8626613e');
      expect(res.statusCode).toEqual(400);

      done();
    });
  });

  describe('Delete', () => {
    let eventres;

    beforeEach(async () => {
      eventres = await request(app)
        .post('/api/event/create')
        .send({
          headerTitle: 'dsfsd',
          headerSinhalaTitle: 'නම',
          headerDescription: 'sdafdsa',
          contentDescription: 'dsfadsfad',
          thumbnailDescription: 'sdfasdf',
          thumbnailTitle: 'sdfdas',
          date: '2025-05-05',
          projectId: `${projectres.body.id}`,
          contentImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          subImages: [
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
          ],
        });
    });


    it('1. should get an event', async (done) => {
      const res = await request(app)
        .delete(`/api/event/${eventres.body.id}`);
      expect(res.statusCode).toEqual(200);

      done();
    });

    it('2. should throw an error if event id is wrong', async (done) => {
      const res = await request(app)
        .delete('/api/event/2de679ab-b4b7-40ca-806a-740c8626613e');
      expect(res.statusCode).toEqual(400);

      done();
    });
  });

  describe('Update', () => {
    let eventres;

    beforeEach(async () => {
      eventres = await request(app)
        .post('/api/event/create')
        .send({
          headerTitle: 'dsfsd',
          headerSinhalaTitle: 'නම',
          headerDescription: 'sdafdsa',
          contentDescription: 'dsfadsfad',
          thumbnailDescription: 'sdfasdf',
          thumbnailTitle: 'sdfdas',
          date: '2025-05-05',
          projectId: `${projectres.body.id}`,
          contentImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          subImages: [
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
          ],
        });
    });

    it('1. should create a new event', async (done) => {
      const res = await request(app)
        .put(`/api/event/${eventres.body.id}`)
        .send({
          headerTitle: 'dsfsd',
          headerSinhalaTitle: 'නම',
          headerDescription: 'sdafdsa',
          contentDescription: 'dsfadsfad',
          thumbnailDescription: 'sdfasdf',
          thumbnailTitle: 'sdfdas',
          date: '2025-05-05',
          projectId: `${projectres.body.id}`,
          contentImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          subImages: [
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
          ],
        });
      expect(res.statusCode).toEqual(200);

      done();
    });

    it('2. should throw an error if headerTitle is empty', async (done) => {
      const res = await request(app)
        .put(`/api/event/${eventres.body.id}`)
        .send({
          headerTitle: '',
          headerSinhalaTitle: 'නම',
          headerDescription: 'sdafdsa',
          contentDescription: 'dsfadsfad',
          thumbnailDescription: 'sdfasdf',
          thumbnailTitle: 'sdfdas',
          date: '2025-05-05',
          projectId: `${projectres.body.id}`,
          contentImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          subImages: [
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
          ],
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('3. should create event even if headerSinhalaTitle is empty', async (done) => {
      const res = await request(app)
        .put(`/api/event/${eventres.body.id}`)
        .send({
          headerTitle: 'hello there',
          headerSinhalaTitle: '',
          headerDescription: 'sdafdsa',
          contentDescription: 'dsfadsfad',
          thumbnailDescription: 'sdfasdf',
          thumbnailTitle: 'sdfdas',
          date: '2025-05-05',
          projectId: `${projectres.body.id}`,
          contentImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          subImages: [
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
          ],
        });
      expect(res.statusCode).toEqual(200);

      done();
    });

    it('4. should create event even if headerDescription is empty', async (done) => {
      const res = await request(app)
        .put(`/api/event/${eventres.body.id}`)
        .send({
          headerTitle: 'dsfsd',
          headerSinhalaTitle: 'නම',
          headerDescription: '',
          contentDescription: 'dsfadsfad',
          thumbnailDescription: 'sdfasdf',
          thumbnailTitle: 'sdfdas',
          date: '2025-05-05',
          projectId: `${projectres.body.id}`,
          contentImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          subImages: [
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
          ],
        });
      expect(res.statusCode).toEqual(200);

      done();
    });

    it('5. should create event even if contentImage is empty', async (done) => {
      const res = await request(app)
        .put(`/api/event/${eventres.body.id}`)
        .send({
          headerTitle: 'dsfsd',
          headerSinhalaTitle: 'නම',
          headerDescription: 'headerDescription',
          contentDescription: 'dsfadsfad',
          thumbnailDescription: 'sdfasdf',
          thumbnailTitle: 'sdfdas',
          date: '2025-05-05',
          projectId: `${projectres.body.id}`,
          contentImage: '',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          subImages: [
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
          ],
        });
      expect(res.statusCode).toEqual(200);

      done();
    });

    it('6. should create event even if contentDescription is empty', async (done) => {
      const res = await request(app)
        .put(`/api/event/${eventres.body.id}`)
        .send({
          headerTitle: 'dsfsd',
          headerSinhalaTitle: 'නම',
          headerDescription: 'headerDescription',
          contentDescription: '',
          thumbnailDescription: 'sdfasdf',
          thumbnailTitle: 'sdfdas',
          date: '2025-05-05',
          projectId: `${projectres.body.id}`,
          contentImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          subImages: [
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
          ],
        });
      expect(res.statusCode).toEqual(200);

      done();
    });

    it('7. should throw an error if thumbnailImage is empty', async (done) => {
      const res = await request(app)
        .put(`/api/event/${eventres.body.id}`)
        .send({
          headerTitle: 'dsfsd',
          headerSinhalaTitle: 'නම',
          headerDescription: 'sdafdsa',
          contentDescription: 'dsfadsfad',
          thumbnailDescription: 'nice',
          thumbnailTitle: 'sdfdas',
          date: '2025-05-05',
          projectId: `${projectres.body.id}`,
          contentImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: '',
          subImages: [
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
          ],
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('8. should throw an error if thumbnailTitle is empty', async (done) => {
      const res = await request(app)
        .put(`/api/event/${eventres.body.id}`)
        .send({
          headerTitle: 'dsfsd',
          headerSinhalaTitle: 'නම',
          headerDescription: 'sdafdsa',
          contentDescription: 'dsfadsfad',
          thumbnailDescription: 'hello',
          thumbnailTitle: '',
          date: '2025-05-05',
          projectId: `${projectres.body.id}`,
          contentImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          subImages: [
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
          ],
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('9. should throw an error if date is empty', async (done) => {
      const res = await request(app)
        .put(`/api/event/${eventres.body.id}`)
        .send({
          headerTitle: 'dsfsd',
          headerSinhalaTitle: 'නම',
          headerDescription: 'sdafdsa',
          contentDescription: 'dsfadsfad',
          thumbnailDescription: 'dsfadsfad',
          thumbnailTitle: 'dsfadsfad',
          date: '',
          projectId: `${projectres.body.id}`,
          contentImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          subImages: [
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
          ],
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('10. should create an event even if subImages is empty', async (done) => {
      const res = await request(app)
        .put(`/api/event/${eventres.body.id}`)
        .send({
          headerTitle: 'dsfsd',
          headerSinhalaTitle: 'නම',
          headerDescription: 'sdafdsa',
          contentDescription: 'dsfadsfad',
          thumbnailDescription: 'dsfadsfad',
          thumbnailTitle: 'dsfadsfad',
          date: '2025-05-05',
          projectId: `${projectres.body.id}`,
          contentImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          subImages: [],
        });
      expect(res.statusCode).toEqual(200);

      done();
    });

    it('11. should throw an error if project id is incorrect', async (done) => {
      const res = await request(app)
        .put(`/api/event/${eventres.body.id}`)
        .send({
          headerTitle: 'dsfsd',
          headerSinhalaTitle: 'නම',
          headerDescription: 'sdafdsa',
          contentDescription: 'dsfadsfad',
          thumbnailDescription: 'dsfadsfad',
          thumbnailTitle: 'dsfadsfad',
          date: '2025-05-05',
          projectId: '2de679ab-b4b7-40ca-806a-740c8626613e',
          contentImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          subImages: [],
        });
      expect(res.statusCode).toEqual(400);

      done();
    });
  });

  describe('List', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/event/create')
        .send({
          headerTitle: 'dsfsd',
          headerSinhalaTitle: 'නම',
          headerDescription: 'sdafdsa',
          contentDescription: 'dsfadsfad',
          thumbnailDescription: 'sdfasdf',
          thumbnailTitle: 'sdfdas',
          date: '2025-05-05',
          projectId: `${projectres.body.id}`,
          contentImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          subImages: [
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
          ],
        });
    });


    it('1. should list events', async (done) => {
      const listres = await request(app)
        .get('/api/event/list');
      expect(listres.statusCode).toEqual(200);
      done();
    });
  });

  describe('List/{{projectId}}', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/event/create')
        .send({
          headerTitle: 'dsfsd',
          headerSinhalaTitle: 'නම',
          headerDescription: 'sdafdsa',
          contentDescription: 'dsfadsfad',
          thumbnailDescription: 'sdfasdf',
          thumbnailTitle: 'sdfdas',
          date: '2025-05-05',
          projectId: `${projectres.body.id}`,
          contentImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          subImages: [
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
          ],
        });
    });


    it('1. should list events of a given project', async (done) => {
      const listres = await request(app)
        .get(`/api/event/list/${projectres.body.id}`);
      expect(listres.statusCode).toEqual(200);
      done();
    });

    it('2. should throw an error if project id is incorrect', async (done) => {
      const listres = await request(app)
        .get('/api/event/list/2de679ab-b4b7-40ca-806a-740c8626613e');
      expect(listres.statusCode).toEqual(400);
      done();
    });
  });

  describe('List/latest', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/event/create')
        .send({
          headerTitle: 'dsfsd',
          headerSinhalaTitle: 'නම',
          headerDescription: 'sdafdsa',
          contentDescription: 'dsfadsfad',
          thumbnailDescription: 'sdfasdf',
          thumbnailTitle: 'sdfdas',
          date: new Date('2000-01-01'),
          projectId: `${projectres.body.id}`,
          contentImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          subImages: [
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
          ],
        });
    });


    it('1. should list events of a given project', async (done) => {
      const listres = await request(app)
        .get('/api/event/list/latest');
      expect(listres.statusCode).toEqual(200);
      expect(listres.body.length).toEqual(1);
      done();
    });
  });

  describe('List/upcoming', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/event/create')
        .send({
          headerTitle: 'dsfsd',
          headerSinhalaTitle: 'නම',
          headerDescription: 'sdafdsa',
          contentDescription: 'dsfadsfad',
          thumbnailDescription: 'sdfasdf',
          thumbnailTitle: 'sdfdas',
          date: new Date('2100-01-01'),
          projectId: `${projectres.body.id}`,
          contentImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          subImages: [
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
            'http://127.0.0.1:8000/Images/147689748061758.jpg',
          ],
        });
    });


    it('1. should list events of a given project', async (done) => {
      const listres = await request(app)
        .get('/api/event/list/upcoming');
      expect(listres.statusCode).toEqual(200);
      expect(listres.body.length).toEqual(1);
      done();
    });
  });
});
