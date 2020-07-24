/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/server');
const truncate = require('./truncate');

describe('Cordinator', () => {
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
    it('1. should create a new cordinator', async (done) => {
      expect(projectres.statusCode).toEqual(200);

      const cordinatorres = await request(app)
        .post('/api/cordinator/create')
        .send({
          name: 'Kamal',
          university: 'UoM',
          description: 'Blah blah',
          alumni: false,
          profileImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          projectId: projectres.body.id,
          alumniProjects: [
            projectres.body.id,
          ],
        });
      expect(cordinatorres.statusCode).toEqual(200);

      done();
    });

    it('2. should throw an error if project id is invalid', async (done) => {
      const cordinatorres = await request(app)
        .post('/api/cordinator/create')
        .send({
          name: 'Kamal',
          university: 'UoM',
          description: 'Blah blah',
          alumni: false,
          profileImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          projectId: '2de679ab-b4b7-40ca-806a-740c8626613e',
          alumniProjects: [
            projectres.body.id,
          ],
        });
      expect(cordinatorres.statusCode).toEqual(400);
      done();
    });

    it('3. should throw an error if name is empty', async (done) => {
      const cordinatorres = await request(app)
        .post('/api/cordinator/create')
        .send({
          name: '',
          university: 'UoM',
          description: 'Blah blah',
          alumni: false,
          profileImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          projectId: projectres.body.id,
          alumniProjects: [
            projectres.body.id,
          ],
        });
      expect(cordinatorres.statusCode).toEqual(400);

      done();
    });

    it('4. should create cordinator even if university is empty', async (done) => {
      const cordinatorres = await request(app)
        .post('/api/cordinator/create')
        .send({
          name: 'Kamal',
          university: '',
          description: 'Blah blah',
          alumni: false,
          profileImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          projectId: projectres.body.id,
          alumniProjects: [
            projectres.body.id,
          ],
        });
      expect(cordinatorres.statusCode).toEqual(200);

      done();
    });

    it('5. should accept even if alumni boolean is given as string', async (done) => {
      const cordinatorres = await request(app)
        .post('/api/cordinator/create')
        .send({
          name: 'Kamal',
          university: 'UoM',
          description: 'Blah blah',
          alumni: 'false',
          profileImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          projectId: projectres.body.id,
          alumniProjects: [
            projectres.body.id,
          ],
        });
      expect(cordinatorres.statusCode).toEqual(200);

      done();
    });
    it('6. should throw an error if alumni is neither true nor false', async (done) => {
      const cordinatorres = await request(app)
        .post('/api/cordinator/create')
        .send({
          name: 'Kamal',
          university: 'UoM',
          description: 'Blah blah',
          alumni: 'not true nor false',
          profileImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          projectId: projectres.body.id,
          alumniProjects: [
            projectres.body.id,
          ],
        });
      expect(cordinatorres.statusCode).toEqual(400);

      done();
    });
    it('7. should throw an error if profile image is of a non acceptable format', async (done) => {
      const cordinatorres = await request(app)
        .post('/api/cordinator/create')
        .send({
          name: 'Kamal',
          university: 'UoM',
          description: 'Blah blah',
          alumni: false,
          profileImage: 'not url',
          projectId: projectres.body.id,
          alumniProjects: [
            projectres.body.id,
          ],
        });
      expect(cordinatorres.statusCode).toEqual(400);

      done();
    });
  });
  describe('Get', () => {
    it('1. should get a cordinator', async (done) => {
      const cordinatorres = await request(app)
        .post('/api/cordinator/create')
        .send({
          name: 'Kamal',
          university: 'UoM',
          description: 'Blah blah',
          alumni: false,
          profileImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          projectId: projectres.body.id,
          alumniProjects: [
            projectres.body.id,
          ],
        });
      expect(cordinatorres.statusCode).toEqual(200);

      const getres = await request(app)
        .get(`/api/cordinator/${cordinatorres.body.id}`);

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
    it('1. should delete a cordinator', async (done) => {
      const cordinatorres = await request(app)
        .post('/api/cordinator/create')
        .send({
          name: 'Kamal',
          university: 'UoM',
          description: 'Blah blah',
          alumni: false,
          profileImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          projectId: projectres.body.id,
          alumniProjects: [
            projectres.body.id,
          ],
        });

      expect(cordinatorres.statusCode).toEqual(200);

      const getres = await request(app)
        .delete(`/api/cordinator/${cordinatorres.body.id}`);

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
    let cordinatorres;
    beforeEach(async () => {
      cordinatorres = await request(app)
        .post('/api/cordinator/create')
        .send({
          name: 'Kamal',
          university: 'UoM',
          description: 'Blah blah',
          alumni: false,
          profileImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          projectId: projectres.body.id,
          alumniProjects: [
            projectres.body.id,
          ],
        });
      expect(cordinatorres.statusCode).toEqual(200);
    });

    it('1. should update an existing cordinator', async (done) => {
      expect(projectres.statusCode).toEqual(200);

      const updateres = await request(app)
        .put(`/api/cordinator/${cordinatorres.body.id}`)
        .send({
          name: 'Kamal',
          university: 'UoM',
          description: 'Blah blah',
          alumni: false,
          profileImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          projectId: projectres.body.id,
          alumniProjects: [
            projectres.body.id,
          ],
        });
      expect(updateres.statusCode).toEqual(200);

      done();
    });

    it('2. should throw an error if cordinator id is invalid', async (done) => {
      const updateres = await request(app)
        .put('/api/cordinator/2de679ab-b4b7-40ca-806a-740c8626613e')
        .send({
          name: 'Kamal',
          university: 'UoM',
          description: 'Blah blah',
          alumni: false,
          profileImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          projectId: projectres.body.id,
          alumniProjects: [
            projectres.body.id,
          ],
        });
      expect(updateres.statusCode).toEqual(400);
      done();
    });

    it('3. should throw an error if project id is invalid', async (done) => {
      const updateres = await request(app)
        .put(`/api/cordinator/${cordinatorres.body.id}`)
        .send({
          name: 'Kamal',
          university: 'UoM',
          description: 'Blah blah',
          alumni: false,
          profileImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          projectId: '2de679ab-b4b7-40ca-806a-740c8626613e',
          alumniProjects: [
            projectres.body.id,
          ],
        });
      expect(updateres.statusCode).toEqual(400);
      done();
    });

    it('4. should throw an error if name is empty', async (done) => {
      const updateres = await request(app)
        .put(`/api/cordinator/${cordinatorres.body.id}`)
        .send({
          name: '',
          university: 'UoM',
          description: 'Blah blah',
          alumni: false,
          profileImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          projectId: projectres.body.id,
          alumniProjects: [
            projectres.body.id,
          ],
        });
      expect(updateres.statusCode).toEqual(400);

      done();
    });

    it('5. should create cordinator even if university is empty', async (done) => {
      const updateres = await request(app)
        .put(`/api/cordinator/${cordinatorres.body.id}`)
        .send({
          name: 'Kamal',
          university: '',
          description: 'Blah blah',
          alumni: false,
          profileImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          projectId: projectres.body.id,
          alumniProjects: [
            projectres.body.id,
          ],
        });
      expect(updateres.statusCode).toEqual(200);

      done();
    });

    it('6. should accept even if alumni boolean is given as string', async (done) => {
      const updateres = await request(app)
        .put(`/api/cordinator/${cordinatorres.body.id}`)
        .send({
          name: 'Kamal',
          university: 'UoM',
          description: 'Blah blah',
          alumni: 'false',
          profileImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          projectId: projectres.body.id,
          alumniProjects: [
            projectres.body.id,
          ],
        });
      expect(updateres.statusCode).toEqual(200);

      done();
    });
    it('7. should throw an error if alumni is neither true nor false', async (done) => {
      const updateres = await request(app)
        .put(`/api/cordinator/${cordinatorres.body.id}`)
        .send({
          name: 'Kamal',
          university: 'UoM',
          description: 'Blah blah',
          alumni: 'not false',
          profileImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          projectId: projectres.body.id,
          alumniProjects: [
            projectres.body.id,
          ],
        });
      expect(updateres.statusCode).toEqual(400);

      done();
    });
    it('8. should throw an error if profile image is of a non acceptable format', async (done) => {
      const updateres = await request(app)
        .put(`/api/cordinator/${cordinatorres.body.id}`)
        .send({
          name: 'Kamal',
          university: 'UoM',
          description: 'Blah blah',
          alumni: false,
          profileImage: 'not url',
          projectId: projectres.body.id,
          alumniProjects: [
            projectres.body.id,
          ],
        });
      expect(updateres.statusCode).toEqual(400);

      done();
    });
  });
  describe('List', () => {
    it('1. should list all cordinators', async (done) => {
      const cordinatorres = await request(app)
        .post('/api/cordinator/create')
        .send({
          name: 'Kamal',
          university: 'UoM',
          description: 'Blah blah',
          alumni: false,
          profileImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          projectId: projectres.body.id,
          alumniProjects: [
            projectres.body.id,
          ],
        });
      expect(cordinatorres.statusCode).toEqual(200);

      const listres = await request(app)
        .get('/api/cordinator/list');
      expect(cordinatorres.statusCode).toEqual(200);
      expect(listres.statusCode).toEqual(200);
      done();
    });
  });
});
