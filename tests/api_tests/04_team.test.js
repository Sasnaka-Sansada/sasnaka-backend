/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/server');
const truncate = require('./truncate');

describe('Team', () => {
  beforeEach(async () => {
    await truncate();
  });

  describe('Create', () => {
    it('1. should create a new team member', async (done) => {
      const res = await request(app)
        .post('/api/team/create')
        .send({
          name: 'Gayal Dassanayake',
          position: 'Vice chancellor',
          achievements: 'None atm',
          description: 'some description',
          profileImage: 'http://127.0.0.1:8000/NotificationBanner/347525700930799.jpg',
          linkedin: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          facebook: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          twitter: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
        });
      expect(res.statusCode).toEqual(200);

      done();
    });

    it('2. should throw an error if name is empty', async (done) => {
      const res = await request(app)
        .post('/api/team/create')
        .send({
          name: '',
          position: 'Vice chancellor',
          achievements: 'None atm',
          description: 'some description',
          profileImage: 'http://127.0.0.1:8000/NotificationBanner/347525700930799.jpg',
          linkedin: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          facebook: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          twitter: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
        });
      expect(res.statusCode).toEqual(400);

      done();
    });
    it('3. should throw an error if position is empty', async (done) => {
      const res = await request(app)
        .post('/api/team/create')
        .send({
          name: 'Gayal Dassanayake',
          position: '',
          achievements: 'None atm',
          description: 'some description',
          profileImage: 'http://127.0.0.1:8000/NotificationBanner/347525700930799.jpg',
          linkedin: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          facebook: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          twitter: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
        });
      expect(res.statusCode).toEqual(400);

      done();
    });
    it('4. should throw an error if achievements is empty', async (done) => {
      const res = await request(app)
        .post('/api/team/create')
        .send({
          name: 'Gayal Dassanayake',
          position: 'Vice chancellor',
          achievements: '',
          description: 'some description',
          profileImage: 'http://127.0.0.1:8000/NotificationBanner/347525700930799.jpg',
          linkedin: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          facebook: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          twitter: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
        });
      expect(res.statusCode).toEqual(400);

      done();
    });
    it('5. should throw an error if description is empty', async (done) => {
      const res = await request(app)
        .post('/api/team/create')
        .send({
          name: 'Gayal Dassanayake',
          position: 'Vice chancellor',
          achievements: 'None atm',
          description: '',
          profileImage: 'http://127.0.0.1:8000/NotificationBanner/347525700930799.jpg',
          linkedin: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          facebook: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          twitter: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('6. should create team member even if linkedin is empty', async (done) => {
      const res = await request(app)
        .post('/api/team/create')
        .send({
          name: 'Gayal Dassanayake',
          position: 'Vice chancellor',
          achievements: 'None atm',
          description: 'some description',
          profileImage: 'http://127.0.0.1:8000/NotificationBanner/347525700930799.jpg',
          linkedin: '',
          facebook: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          twitter: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
        });
      expect(res.statusCode).toEqual(200);

      done();
    });

    it('7. should create team member even if facebook is empty', async (done) => {
      const res = await request(app)
        .post('/api/team/create')
        .send({
          name: 'Gayal Dassanayake',
          position: 'Vice chancellor',
          achievements: 'None atm',
          description: 'some description',
          profileImage: 'http://127.0.0.1:8000/NotificationBanner/347525700930799.jpg',
          linkedin: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          facebook: '',
          twitter: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
        });

      expect(res.statusCode).toEqual(200);

      done();
    });

    it('8. should create team member even if twitter is empty', async (done) => {
      const res = await request(app)
        .post('/api/team/create')
        .send({
          name: 'Gayal Dassanayake',
          position: 'Vice chancellor',
          achievements: 'None atm',
          description: 'some description',
          profileImage: 'http://127.0.0.1:8000/NotificationBanner/347525700930799.jpg',
          linkedin: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          facebook: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          twitter: '',
        });
      expect(res.statusCode).toEqual(200);

      done();
    });

    it('9. should throw an error if profile image is of a non acceptable format', async (done) => {
      const res = await request(app)
        .post('/api/team/create')
        .send({
          name: 'Gayal Dassanayake',
          position: 'Vice chancellor',
          achievements: 'None atm',
          description: 'some description',
          profileImage: 'not url',
          linkedin: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          facebook: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          twitter: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
        });

      expect(res.statusCode).toEqual(400);

      done();
    });

    it('10. should throw an error if profile image is empty', async (done) => {
      const res = await request(app)
        .post('/api/team/create')
        .send({
          name: 'Gayal Dassanayake',
          position: 'Vice chancellor',
          achievements: 'None atm',
          description: 'some description',
          profileImage: null,
          linkedin: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          facebook: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          twitter: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
        });
      expect(res.statusCode).toEqual(400);

      done();
    });
  });

  describe('Delete', () => {
    let teamres;

    beforeEach(async () => {
      teamres = await request(app)
        .post('/api/team/create')
        .send({
          name: 'Gayal Dassanayake',
          position: 'Vice chancellor',
          achievements: 'None atm',
          description: 'some description',
          profileImage: 'http://127.0.0.1:8000/NotificationBanner/347525700930799.jpg',
          linkedin: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          facebook: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          twitter: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
        });
    });

    it('1. should delete a team member', async (done) => {
      const getres = await request(app)
        .delete(`/api/team/${teamres.body.id}`);

      expect(getres.statusCode).toEqual(200);
      done();
    });
    it('2. should throw an error if id is not valid', async (done) => {
      const res = await request(app)
        .delete('/api/team/2de679ab-b4b7-40ca-806a-740c8626613e');
      expect(res.statusCode).toEqual(400);
      done();
    });
  });

  describe('Update', () => {
    let teamres;

    beforeEach(async () => {
      teamres = await request(app)
        .post('/api/team/create')
        .send({
          name: 'Gayal Dassanayake',
          position: 'Vice chancellor',
          achievements: 'None atm',
          description: 'some description',
          profileImage: 'http://127.0.0.1:8000/NotificationBanner/347525700930799.jpg',
          linkedin: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          facebook: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          twitter: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
        });
    });

    it('1. should update an existing team member', async (done) => {
      const res = await request(app)
        .put(`/api/team/${teamres.body.id}`)
        .send({
          name: 'Gayal Dassanayake',
          position: 'Vice chancellor',
          achievements: 'None atm',
          description: 'some description',
          profileImage: 'http://127.0.0.1:8000/NotificationBanner/347525700930799.jpg',
          linkedin: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          facebook: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          twitter: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
        });
      expect(res.statusCode).toEqual(200);

      done();
    });

    it('2. should throw an error if name is empty', async (done) => {
      const res = await request(app)
        .put(`/api/team/${teamres.body.id}`)
        .send({
          name: '',
          position: 'Vice chancellor',
          achievements: 'None atm',
          description: 'some description',
          profileImage: 'http://127.0.0.1:8000/NotificationBanner/347525700930799.jpg',
          linkedin: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          facebook: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          twitter: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
        });
      expect(res.statusCode).toEqual(400);

      done();
    });
    it('3. should throw an error if position is empty', async (done) => {
      const res = await request(app)
        .put(`/api/team/${teamres.body.id}`)
        .send({
          name: 'Gayal Dassanayake',
          position: '',
          achievements: 'None atm',
          description: 'some description',
          profileImage: 'http://127.0.0.1:8000/NotificationBanner/347525700930799.jpg',
          linkedin: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          facebook: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          twitter: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
        });
      expect(res.statusCode).toEqual(400);

      done();
    });
    it('4. should throw an error if achievements is empty', async (done) => {
      const res = await request(app)
        .put(`/api/team/${teamres.body.id}`)
        .send({
          name: 'Gayal Dassanayake',
          position: 'Vice chancellor',
          achievements: '',
          description: 'some description',
          profileImage: 'http://127.0.0.1:8000/NotificationBanner/347525700930799.jpg',
          linkedin: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          facebook: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          twitter: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
        });
      expect(res.statusCode).toEqual(400);

      done();
    });
    it('5. should throw an error if description is empty', async (done) => {
      const res = await request(app)
        .put(`/api/team/${teamres.body.id}`)
        .send({
          name: 'Gayal Dassanayake',
          position: 'Vice chancellor',
          achievements: 'None atm',
          description: '',
          profileImage: 'http://127.0.0.1:8000/NotificationBanner/347525700930799.jpg',
          linkedin: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          facebook: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          twitter: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('6. should update team member even if linkedin is empty', async (done) => {
      const res = await request(app)
        .put(`/api/team/${teamres.body.id}`)
        .send({
          name: 'Gayal Dassanayake',
          position: 'Vice chancellor',
          achievements: 'None atm',
          description: 'some description',
          profileImage: 'http://127.0.0.1:8000/NotificationBanner/347525700930799.jpg',
          linkedin: '',
          facebook: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          twitter: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
        });
      expect(res.statusCode).toEqual(200);

      done();
    });

    it('7. should update team member even if facebook is empty', async (done) => {
      const res = await request(app)
        .put(`/api/team/${teamres.body.id}`)
        .send({
          name: 'Gayal Dassanayake',
          position: 'Vice chancellor',
          achievements: 'None atm',
          description: 'some description',
          profileImage: 'http://127.0.0.1:8000/NotificationBanner/347525700930799.jpg',
          linkedin: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          facebook: '',
          twitter: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
        });

      expect(res.statusCode).toEqual(200);

      done();
    });

    it('8. should update team member even if twitter is empty', async (done) => {
      const res = await request(app)
        .put(`/api/team/${teamres.body.id}`)
        .send({
          name: 'Gayal Dassanayake',
          position: 'Vice chancellor',
          achievements: 'None atm',
          description: 'some description',
          profileImage: 'http://127.0.0.1:8000/NotificationBanner/347525700930799.jpg',
          linkedin: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          facebook: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          twitter: '',
        });
      expect(res.statusCode).toEqual(200);

      done();
    });

    it('9. should throw an error if profile image is of a non acceptable format', async (done) => {
      const res = await request(app)
        .put(`/api/team/${teamres.body.id}`)
        .send({
          name: 'Gayal Dassanayake',
          position: 'Vice chancellor',
          achievements: 'None atm',
          description: 'some description',
          profileImage: 'not url',
          linkedin: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          facebook: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          twitter: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
        });

      expect(res.statusCode).toEqual(400);

      done();
    });

    it('10. should throw an error if profile image is empty', async (done) => {
      const res = await request(app)
        .put(`/api/team/${teamres.body.id}`)
        .send({
          name: 'Gayal Dassanayake',
          position: 'Vice chancellor',
          achievements: 'None atm',
          description: 'some description',
          profileImage: '',
          linkedin: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          facebook: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          twitter: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
        });
      expect(res.statusCode).toEqual(400);

      done();
    });
  });
  describe('List', () => {
    it('1. should list all team members', async (done) => {
      const postres = await request(app)
        .post('/api/team/create')
        .send({
          name: 'Gayal Dassanayake',
          position: 'Vice chancellor',
          achievements: 'None atm',
          description: 'some description',
          profileImage: 'http://127.0.0.1:8000/NotificationBanner/347525700930799.jpg',
          linkedin: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          facebook: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
          twitter: 'https://docs.google.com/spreadsheets/d/1Nc52uWIcZ4dKnwRwiEqs2_ccijqgoS5dTFgWHuHYltE/edit#gid=0',
        });

      const listres = await request(app)
        .get('/api/team/list');
      expect(postres.statusCode).toEqual(200);
      expect(listres.statusCode).toEqual(200);
      expect(listres.body).toEqual(expect.arrayContaining([postres.body]));

      done();
    });
  });
});
