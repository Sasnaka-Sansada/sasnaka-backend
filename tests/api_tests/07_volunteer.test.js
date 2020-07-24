/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/server');
const truncate = require('./truncate');

describe('Volunteer', () => {
  beforeEach(async () => {
    await truncate();
  });

  describe('Create', () => {
    it('1. should create a new volunteer', async (done) => {
      const res = await request(app)
        .post('/api/volunteer/create')
        .send({
          name: 'Gayal Dassanayake',
          birthday: '1997-09-19',
          email: 'gayal@fsf.com',
          contactNumber: '+94374921366',
          address: 'dsfhdashsafh',
          potentials: 'dsfsdaf',
          interested: 'dsf',
          comment: 'some comment',
        });
      expect(res.statusCode).toEqual(200);

      done();
    });
    it('2. should throw an error if name is empty', async (done) => {
      const res = await request(app)
        .post('/api/volunteer/create')
        .send({
          name: '',
          birthday: '1997-09-19',
          email: 'gayal@fsf.com',
          contactNumber: '+94374921366',
          address: 'dsfhdashsafh',
          potentials: 'dsfsdaf',
          interested: 'dsf',
          comment: 'some comment',
        });
      expect(res.statusCode).toEqual(400);

      done();
    });
    it('3. should throw an error if birthday is empty', async (done) => {
      const res = await request(app)
        .post('/api/volunteer/create')
        .send({
          name: 'Gayal Dassanayake',
          birthday: '',
          email: 'gayal@fsf.com',
          contactNumber: '+94374921366',
          address: 'dsfhdashsafh',
          potentials: 'dsfsdaf',
          interested: 'dsf',
          comment: 'some comment',
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('4. should throw an error if birthday is in a wrong format', async (done) => {
      const res = await request(app)
        .post('/api/volunteer/create')
        .send({
          name: 'Gayal Dassanayake',
          birthday: '80000-09-100',
          email: 'gayal@fsf.com',
          contactNumber: '+94374921366',
          address: 'dsfhdashsafh',
          potentials: 'dsfsdaf',
          interested: 'dsf',
          comment: 'some comment',
        });
      expect(res.statusCode).toEqual(400);

      done();
    });
    it('5. should throw an error if email is in a wrong format', async (done) => {
      const res = await request(app)
        .post('/api/volunteer/create')
        .send({
          name: 'Gayal Dassanayake',
          birthday: '1997-09-19',
          email: 'gayal@wrongemailformat',
          contactNumber: '+94374921366',
          address: 'dsfhdashsafh',
          potentials: 'dsfsdaf',
          interested: 'dsf',
          comment: 'some comment',
        });
      expect(res.statusCode).toEqual(400);

      done();
    });
    it('6. should throw an error if email is empty', async (done) => {
      const res = await request(app)
        .post('/api/volunteer/create')
        .send({
          name: 'Gayal Dassanayake',
          birthday: '1997-09-19',
          email: '',
          contactNumber: '+94374921366',
          address: 'dsfhdashsafh',
          potentials: 'dsfsdaf',
          interested: 'dsf',
          comment: 'some comment',
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('7. should throw an error if contact is in a wrong format', async (done) => {
      const res = await request(app)
        .post('/api/volunteer/create')
        .send({
          name: 'Gayal Dassanayake',
          birthday: '1997-09-19',
          email: 'gayal@gmail.com',
          contactNumber: 'not integer',
          address: 'dsfhdashsafh',
          potentials: 'dsfsdaf',
          interested: 'dsf',
          comment: 'some comment',
        });
      expect(res.statusCode).toEqual(400);

      done();
    });
    it('8. should throw an error if contact number is empty', async (done) => {
      const res = await request(app)
        .post('/api/volunteer/create')
        .send({
          name: 'Gayal Dassanayake',
          birthday: '1997-09-19',
          email: 'gayal@gmail.com',
          contactNumber: '',
          address: 'dsfhdashsafh',
          potentials: 'dsfsdaf',
          interested: 'dsf',
          comment: 'some comment',
        });
      expect(res.statusCode).toEqual(400);

      done();
    });
    it('9. should throw an error if contact number length is higher than 15', async (done) => {
      const res = await request(app)
        .post('/api/volunteer/create')
        .send({
          name: 'Gayal Dassanayake',
          birthday: '1997-09-19',
          email: 'gayal@gmail.com',
          contactNumber: '111111111111111111111111111111',
          address: 'dsfhdashsafh',
          potentials: 'dsfsdaf',
          interested: 'dsf',
          comment: 'some comment',
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('10. should create volunteer even if address is empty', async (done) => {
      const res = await request(app)
        .post('/api/volunteer/create')
        .send({
          name: 'Gayal Dassanayake',
          birthday: '1997-09-19',
          email: 'gayal@fsf.com',
          contactNumber: '+94374921366',
          address: '',
          potentials: 'dsfsdaf',
          interested: 'dsf',
          comment: 'some comment',
        });
      expect(res.statusCode).toEqual(200);

      done();
    });
    it('11. should create volunteer even if potentials is empty', async (done) => {
      const res = await request(app)
        .post('/api/volunteer/create')
        .send({
          name: 'Gayal Dassanayake',
          birthday: '1997-09-19',
          email: 'gayal@fsf.com',
          contactNumber: '+94374921366',
          address: 'dsfhdashsafh',
          potentials: '',
          interested: 'dsf',
          comment: 'some comment',
        });
      expect(res.statusCode).toEqual(200);

      done();
    });
    it('12. should create volunteer even if interested is empty', async (done) => {
      const res = await request(app)
        .post('/api/volunteer/create')
        .send({
          name: 'Gayal Dassanayake',
          birthday: '1997-09-19',
          email: 'gayal@fsf.com',
          contactNumber: '+94374921366',
          address: 'dsfhdashsafh',
          potentials: 'dsfsdaf',
          interested: '',
          comment: 'some comment',
        });
      expect(res.statusCode).toEqual(200);

      done();
    });
    it('13. should create volunteer even if comment is empty', async (done) => {
      const res = await request(app)
        .post('/api/volunteer/create')
        .send({
          name: 'Gayal Dassanayake',
          birthday: '1997-09-19',
          email: 'gayal@fsf.com',
          contactNumber: '+94374921366',
          address: 'dsfhdashsafh',
          potentials: 'dsfsdaf',
          interested: 'dsf',
          comment: '',
        });
      expect(res.statusCode).toEqual(200);

      done();
    });
  });

  describe('List', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/volunteer/create')
        .send({
          name: 'Gayal Dassanayake',
          birthday: '1997-09-19',
          email: 'gayal@fsf.com',
          contactNumber: '+94374921366',
          address: 'dsfhdashsafh',
          potentials: 'dsfsdaf',
          interested: 'dsf',
          comment: 'some comment',
        });
    });


    it('1. should list volunteers', async (done) => {
      const listres = await request(app)
        .get('/api/volunteer/list');
      expect(listres.statusCode).toEqual(200);
      done();
    });
  });
});
