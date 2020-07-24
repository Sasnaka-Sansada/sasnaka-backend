/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/server');
const truncate = require('./truncate');

describe('Feedback', () => {
  beforeEach(async () => {
    await truncate();
  });
  describe('Create', () => {
    it('1. should create a new project', async (done) => {
      const res = await request(app)
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
      expect(res.statusCode).toEqual(200);
      done();
    });
    it('2. should throw an error if project header is duplicate', async (done) => {
      const res = await request(app)
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
      const res2 = await request(app)
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
      expect(res.statusCode).toEqual(200);
      expect(res2.statusCode).toEqual(400);
      done();
    });
    it('3. should throw an error if project header is more than 255', async (done) => {
      const res = await request(app)
        .post('/api/project/create')
        .send({
          header: 'Loaded configuration file src/config/databasejsUsing environment testNo migrations were executed, database schema was already up to date.Now that we have got the test environment set up, it is time to start testing the API endpoints. Since our endpoint needs to make a request to the database, we need to set up a test database. The reason for setting up a test database is that well be dropping the database each time we run a test.',
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
      expect(res.statusCode).toEqual(400);
      done();
    });
    it('4. should throw an error if one of the images does not have url format', async (done) => {
      const res = await request(app)
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
          introductionImage: 'some not url',
          objectiveImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          processImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
        });
      expect(res.statusCode).toEqual(400);
      done();
    });
    it('5. should throw an error if pillerId is invalid', async (done) => {
      const res = await request(app)
        .post('/api/project/create')
        .send({
          header: 'header23',
          subHeader: 'some string',
          translatedHeader: 'නම',
          introduction: 'some string2',
          objective: 'not empty',
          process: 'blah blah',
          thumbnailDescription: 'some description',
          pillerId: 'WRONG_PILLER',
          introductionImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          objectiveImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          processImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          thumbnailImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
        });
      expect(res.statusCode).toEqual(400);
      done();
    });
    it('6. should throw an error if header is empty', async (done) => {
      const res = await request(app)
        .post('/api/project/create')
        .send({
          header: '',
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
      expect(res.statusCode).toEqual(400);
      done();
    });
  });
  describe('Get', () => {
    it('1. should get a project', async (done) => {
      const postres = await request(app)
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
      const getres = await request(app)
        .get(`/api/project/${postres.body.id}`);
      expect(postres.statusCode).toEqual(200);
      expect(getres.statusCode).toEqual(200);
      done();
    });
    it('2. should throw an error if id is not valid', async (done) => {
      const res = await request(app)
        .get('/api/project/2de679ab-b4b7-40ca-806a-740c8626613e');
      expect(res.statusCode).toEqual(400);
      done();
    });
  });
  describe('Delete', () => {
    it('1. should delete a project', async (done) => {
      const postres = await request(app)
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
      const getres = await request(app)
        .delete(`/api/project/${postres.body.id}`);
      expect(postres.statusCode).toEqual(200);
      expect(getres.statusCode).toEqual(200);
      done();
    });
    it('2. should throw an error if id is not valid', async (done) => {
      const res = await request(app)
        .delete('/api/project/2de679ab-b4b7-40ca-806a-740c8626613e');
      expect(res.statusCode).toEqual(400);
      done();
    });
  });
  describe('Update', () => {
    it('1. should update a project', async (done) => {
      const postres = await request(app)
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
      const putres = await request(app)
        .put(`/api/project/${postres.body.id}`)
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
      expect(postres.statusCode).toEqual(200);
      expect(putres.statusCode).toEqual(200);
      done();
    });
    it('2. should throw an error if id is not valid', async (done) => {
      const res = await request(app)
        .put('/api/project/2de679ab-b4b7-40ca-806a-740c8626613e')
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
      expect(res.statusCode).toEqual(400);
      done();
    });
    it('3. should throw an error if new update header is already taken', async (done) => {
      const postres1 = await request(app)
        .post('/api/project/create')
        .send({
          header: 'header',
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

      const postres2 = await request(app)
        .post('/api/project/create')
        .send({
          header: 'header1',
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
      const putres = await request(app)
        .put(`/api/project/${postres2.body.id}`)
        .send({
          header: 'header',
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

      expect(postres1.statusCode).toEqual(200);
      expect(postres2.statusCode).toEqual(200);
      expect(putres.statusCode).toEqual(400);
      done();
    });
  });
  describe('List', () => {
    it('1. should list all projects', async (done) => {
      const postres = await request(app)
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

      const listres = await request(app)
        .get('/api/project/list');
      expect(postres.statusCode).toEqual(200);
      expect(listres.statusCode).toEqual(200);
      done();
    });
  });
  describe('List/pillerId', () => {
    it('1. should list all projects belonging to a piller', async (done) => {
      const postres = await request(app)
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

      const listres = await request(app)
        .get('/api/project/list/LEADERSHIP_GROOMING');
      expect(postres.statusCode).toEqual(200);
      expect(listres.statusCode).toEqual(200);
      expect(listres.body).toEqual(expect.arrayContaining([postres.body]));
      done();
    });
    it('2. should throw an error if piller id is not valid', async (done) => {
      const postres = await request(app)
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

      const listres = await request(app)
        .get('/api/project/list/INVALID_PILLER');
      expect(postres.statusCode).toEqual(200);
      expect(listres.statusCode).toEqual(400);
      done();
    });
  });
});
