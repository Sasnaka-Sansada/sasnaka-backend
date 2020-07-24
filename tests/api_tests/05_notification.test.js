/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/server');
const truncate = require('./truncate');

describe('Notification', () => {
  beforeEach(async () => {
    await truncate();
  });

  describe('Create', () => {
    it('1. should create a new notfication', async (done) => {
      const res = await request(app)
        .post('/api/notification/create')
        .send({
          header: 'Note1',
          subHeader: 'subheader',
          description: 'fddfas',
          subDescription: 'fasdf',
          bannerImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          portraitImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          active: false,
          attatchments: [
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
          ],
        });
      expect(res.statusCode).toEqual(200);

      done();
    });
    it('2. should throw an error if header is null', async (done) => {
      const res = await request(app)
        .post('/api/notification/create')
        .send({
          header: '',
          subHeader: 'subheader',
          description: 'fddfas',
          subDescription: 'fasdf',
          bannerImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          portraitImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          active: false,
          attatchments: [
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
          ],
        });
      expect(res.statusCode).toEqual(400);

      done();
    });
    it('3. should create notfication even if subHeader is empty', async (done) => {
      const res = await request(app)
        .post('/api/notification/create')
        .send({
          header: 'nice to meet',
          subHeader: '',
          description: 'fddfas',
          subDescription: 'fasdf',
          bannerImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          portraitImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          active: false,
          attatchments: [
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
          ],
        });
      expect(res.statusCode).toEqual(200);

      done();
    });
    it('4. should throw an error if description is null', async (done) => {
      const res = await request(app)
        .post('/api/notification/create')
        .send({
          header: 'hello',
          subHeader: 'subheader',
          description: '',
          subDescription: 'fasdf',
          bannerImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          portraitImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          active: false,
          attatchments: [
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
          ],
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('5. should create notification if sub description is null', async (done) => {
      const res = await request(app)
        .post('/api/notification/create')
        .send({
          header: 'hello',
          subHeader: 'subheader',
          description: 'hello again',
          subDescription: null,
          bannerImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          portraitImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          active: false,
          attatchments: [
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
          ],
        });
      expect(res.statusCode).toEqual(200);

      done();
    });

    it('6. should throw an error if bannerImage is null', async (done) => {
      const res = await request(app)
        .post('/api/notification/create')
        .send({
          header: 'hello',
          subHeader: 'subheader',
          description: 'description',
          subDescription: 'fasdf',
          bannerImage: '',
          portraitImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          active: false,
          attatchments: [
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
          ],
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('7. should throw an error if portraitImage is null', async (done) => {
      const res = await request(app)
        .post('/api/notification/create')
        .send({
          header: 'hello',
          subHeader: 'subheader',
          description: 'description',
          subDescription: 'fasdf',
          bannerImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          portraitImage: '',
          active: false,
          attatchments: [
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
          ],
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('8. should create notification even if attatchments is empty is null', async (done) => {
      const res = await request(app)
        .post('/api/notification/create')
        .send({
          header: 'hello',
          subHeader: 'subheader',
          description: 'description',
          subDescription: 'fasdf',
          bannerImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          portraitImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          active: false,
          attatchments: [],
        });
      expect(res.statusCode).toEqual(200);

      done();
    });

    it('9. should throw an error if active is not a boolean', async (done) => {
      const res = await request(app)
        .post('/api/notification/create')
        .send({
          header: 'Note1',
          subHeader: 'subheader',
          description: 'fddfas',
          subDescription: 'fasdf',
          bannerImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          portraitImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          active: null,
          attatchments: [
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
          ],
        });
      expect(res.statusCode).toEqual(400);

      done();
    });
  });

  describe('Get', () => {
    let notificationres;

    beforeEach(async () => {
      notificationres = await request(app)
        .post('/api/notification/create')
        .send({
          header: 'Note1',
          subHeader: 'subheader',
          description: 'fddfas',
          subDescription: 'fasdf',
          bannerImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          portraitImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          active: false,
          attatchments: [
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
          ],
        });
    });


    it('1. should get a notfication', async (done) => {
      const res = await request(app)
        .get(`/api/notification/${notificationres.body.id}`);
      expect(res.statusCode).toEqual(200);

      done();
    });

    it('2. should throw an error if notification id is wrong', async (done) => {
      const res = await request(app)
        .get('/api/notification/2de679ab-b4b7-40ca-806a-740c8626613e');
      expect(res.statusCode).toEqual(400);

      done();
    });
  });

  describe('Delete', () => {
    let notificationres;

    beforeEach(async () => {
      notificationres = await request(app)
        .post('/api/notification/create')
        .send({
          header: 'Note1',
          subHeader: 'subheader',
          description: 'fddfas',
          subDescription: 'fasdf',
          bannerImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          portraitImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          active: false,
          attatchments: [
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
          ],
        });
    });


    it('1. should delete a notfication', async (done) => {
      const res = await request(app)
        .delete(`/api/notification/${notificationres.body.id}`);
      expect(res.statusCode).toEqual(200);

      done();
    });

    it('2. should throw an error if notification id is wrong', async (done) => {
      const res = await request(app)
        .delete('/api/notification/2de679ab-b4b7-40ca-806a-740c8626613e');
      expect(res.statusCode).toEqual(400);

      done();
    });
  });

  describe('Update', () => {
    let notificationres;

    beforeEach(async () => {
      notificationres = await request(app)
        .post('/api/notification/create')
        .send({
          header: 'Note1',
          subHeader: 'subheader',
          description: 'fddfas',
          subDescription: 'fasdf',
          bannerImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          portraitImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          active: false,
          attatchments: [
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
          ],
        });
    });

    it('1. should update a notfication', async (done) => {
      const res = await request(app)
        .put(`/api/notification/${notificationres.body.id}`)
        .send({
          header: 'Note1',
          subHeader: 'subheader',
          description: 'fddfas',
          subDescription: 'fasdf',
          bannerImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          portraitImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          active: false,
          attatchments: [
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
          ],
        });
      expect(res.statusCode).toEqual(200);

      done();
    });
    it('2. should throw an error if header is null', async (done) => {
      const res = await request(app)
        .put(`/api/notification/${notificationres.body.id}`)
        .send({
          header: '',
          subHeader: 'subheader',
          description: 'fddfas',
          subDescription: 'fasdf',
          bannerImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          portraitImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          active: false,
          attatchments: [
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
          ],
        });
      expect(res.statusCode).toEqual(400);

      done();
    });
    it('3. should create notfication even if subHeader is empty', async (done) => {
      const res = await request(app)
        .put(`/api/notification/${notificationres.body.id}`)
        .send({
          header: 'nice to meet',
          subHeader: '',
          description: 'fddfas',
          subDescription: 'fasdf',
          bannerImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          portraitImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          active: false,
          attatchments: [
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
          ],
        });
      expect(res.statusCode).toEqual(200);

      done();
    });
    it('4. should throw an error if description is null', async (done) => {
      const res = await request(app)
        .put(`/api/notification/${notificationres.body.id}`)
        .send({
          header: 'hello',
          subHeader: 'subheader',
          description: '',
          subDescription: 'fasdf',
          bannerImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          portraitImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          active: false,
          attatchments: [
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
          ],
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('5. should create notification if sub description is null', async (done) => {
      const res = await request(app)
        .put(`/api/notification/${notificationres.body.id}`)
        .send({
          header: 'hello',
          subHeader: 'subheader',
          description: 'hello again',
          subDescription: null,
          bannerImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          portraitImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          active: false,
          attatchments: [
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
          ],
        });
      expect(res.statusCode).toEqual(200);

      done();
    });

    it('6. should throw an error if bannerImage is null', async (done) => {
      const res = await request(app)
        .put(`/api/notification/${notificationres.body.id}`)
        .send({
          header: 'hello',
          subHeader: 'subheader',
          description: 'description',
          subDescription: 'fasdf',
          bannerImage: '',
          portraitImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          active: false,
          attatchments: [
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
          ],
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('7. should throw an error if portraitImage is null', async (done) => {
      const res = await request(app)
        .put(`/api/notification/${notificationres.body.id}`)
        .send({
          header: 'hello',
          subHeader: 'subheader',
          description: 'description',
          subDescription: 'fasdf',
          bannerImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          portraitImage: '',
          active: false,
          attatchments: [
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
          ],
        });
      expect(res.statusCode).toEqual(400);

      done();
    });

    it('8. should create notification even if attatchments is empty is null', async (done) => {
      const res = await request(app)
        .put(`/api/notification/${notificationres.body.id}`)
        .send({
          header: 'hello',
          subHeader: 'subheader',
          description: 'description',
          subDescription: 'fasdf',
          bannerImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          portraitImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          active: false,
          attatchments: [],
        });
      expect(res.statusCode).toEqual(200);

      done();
    });

    it('9. should throw an error if active is not a boolean', async (done) => {
      const res = await request(app)
        .put(`/api/notification/${notificationres.body.id}`)
        .send({
          header: 'Note1',
          subHeader: 'subheader',
          description: 'fddfas',
          subDescription: 'fasdf',
          bannerImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          portraitImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          active: null,
          attatchments: [
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
          ],
        });
      expect(res.statusCode).toEqual(400);

      done();
    });
  });

  describe('List', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/notification/create')
        .send({
          header: 'Note1',
          subHeader: 'subheader',
          description: 'fddfas',
          subDescription: 'fasdf',
          bannerImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          portraitImage: 'http://127.0.0.1:8000/Images/147689748061758.jpg',
          active: false,
          attatchments: [
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
            {
              name: 'attatchment1',
              attatchment: 'http://127.0.0.1:8000/Documents/979529019169389.pdf',
            },
          ],
        });
    });


    it('1. should list notfications', async (done) => {
      const listres = await request(app)
        .get('/api/notification/list');
      expect(listres.statusCode).toEqual(200);
      done();
    });
  });
});
