import { expect } from 'chai';
import request from 'supertest';
import bcrypt from 'bcrypt';
import server from '../../server/server';
import { User, EventCenter } from '../../server/models';
/* eslint-disable no-unused-expressions  */

const hash = bcrypt.hashSync;

const createAdminUser = () => {
  User.create({
    username: 'bayo', email: 'bayo@gmail.com', password: hash('bayo', 10), fullname: 'Bayo', admin: true,
  });
};

const createNormalUser = () => {
  User.create({
    username: 'ben', email: 'ben@gmail.com', password: hash('ben', 10), fullname: 'Ben', admin: false,
  });
};

const createCenter = () => {
  EventCenter.create({
    name: 'Johnson\'s Hall', type: 'Multipurpose Hall', price: 15000, location: 'Abuja', userId: 1,
  });
};

describe('Centers', () => {
  before((done) => {
    createNormalUser();
    createAdminUser();
    createCenter();
    createCenter();
    done();
  });

  it('(GET /api/v1/centers/) should return 302 if available', (done) => {
    request(server)
      .post('/api/v1/users/login')
      .send({ username: 'ben', password: 'ben' })
      .end(() => {
        request(server)
          .get('/api/v1/centers')
          .end((err2, res2) => {
            expect(res2.status).to.equal(200);
            expect(res2.body).to.be.an('object');
            expect(res2.body.message).to.equal('all centers delivered!');
            done();
          });
      });
  });

  it('(GET /centers/<centerId>) should return 302 if available', (done) => {
    request(server)
      .post('/api/v1/users/login')
      .send({ username: 'ben', password: 'ben' })
      .end(() => {
        request(server)
          .get('/api/v1/centers/1')
          .end((err2, res2) => {
            expect(res2.status).to.equal(200);
            expect(res2.body).to.be.an('object');
            expect(res2.body.message).to.equal('center delivered!');
            done();
          });
      });
  });

  it('(POST /centers) should return 201 if user is admin', (done) => {
    request(server)
      .post('/api/v1/users/login')
      .send({ username: 'bayo', password: 'bayo' })
      .end((err, res) => {
        const { token } = res.body;
        request(server)
          .post('/api/v1/centers')
          .set('token', token)
          .send({
            name: 'Jake\'s Hall', description: 'Awesome hall', type: 'Multipurpose Hall', price: 5000, location: 'Lagos',
          })
          .end((err2, res2) => {
            expect(res2.status).to.equal(201);
            expect(res2.body).to.be.an('object');
            expect(res2.body.message).to.equal('center created!');
            done();
          });
      });
  });


  it('(POST /centers) should return 403 if user is not admin', (done) => {
    request(server)
      .post('/api/v1/users/login')
      .send({ username: 'ben', password: 'ben' })
      .end((err, res) => {
        const { token } = res.body;
        request(server)
          .post('/api/v1/centers')
          .set('token', token)
          .send({
            name: 'Jake\'s Hall', description: 'Awesome hall', type: 'Multipurpose Hall', price: 5000, location: 'Lagos',
          })
          .end((err2, res2) => {
            expect(res2.status).to.equal(403);
            expect(res2.body).to.be.an('object');
            expect(res2.body.message).to.equal('you don\'t have enough permission to access this route!');
            done();
          });
      });
  });


  it('(POST /centers) should return 400 if name field is missing', (done) => {
    request(server)
      .post('/api/v1/users/login')
      .send({ username: 'ben', password: 'ben' })
      .end((err, res) => {
        const { token } = res.body;
        request(server)
          .post('/api/v1/centers')
          .set('token', token)
          .send({
            description: 'Awesome hall', type: 'Multipurpose Hall', price: 5000, location: 'Lagos',
          })
          .end((err2, res2) => {
            expect(res2.status).to.equal(400);
            expect(res2.body).to.be.an('object');
            expect(res2.body.message).to.equal('name required in body!');
            done();
          });
      });
  });

  it('(POST /centers) should return 400 if price field is missing', (done) => {
    request(server)
      .post('/api/v1/users/login')
      .send({ username: 'ben', password: 'ben' })
      .end((err, res) => {
        const { token } = res.body;
        request(server)
          .post('/api/v1/centers')
          .set('token', token)
          .send({
            name: 'Jake\'s Hall', description: 'Awesome hall', type: 'Multipurpose Hall', location: 'Lagos',
          })
          .end((err2, res2) => {
            expect(res2.status).to.equal(400);
            expect(res2.body).to.be.an('object');
            expect(res2.body.message).to.equal('price required in body!');
            done();
          });
      });
  });

  it('(PUT /centers/<centerId>) should 200 return if usewr is admin', (done) => {
    request(server)
      .post('/api/v1/users/login')
      .send({ username: 'bayo', password: 'bayo' })
      .end((err, res) => {
        const { token } = res.body;
        request(server)
          .put('/api/v1/centers/2')
          .set('token', token)
          .send({
            name: 'John\'s Hall', description: 'New shiny hall',
          })
          .end((err2, res2) => {
            expect(res2.status).to.equal(200);
            expect(res2.body).to.be.an('object');
            expect(res2.body.message).to.equal('center modified!');
            done();
          });
      });
  });

  it('(PUT /centers/<centerId>) should return 403 if user is not admin', (done) => {
    request(server)
      .post('/api/v1/users/login')
      .send({ username: 'ben', password: 'ben' })
      .end((err, res) => {
        const { token } = res.body;
        request(server)
          .put('/api/v1/centers/2')
          .set('token', token)
          .send({
            name: 'John\'s Hall', description: 'New shiny hall',
          })
          .end((err2, res2) => {
            expect(res2.status).to.equal(403);
            expect(res2.body).to.be.an('object');
            expect(res2.body.message).to.equal('you don\'t have enough permission to access this route!');
            done();
          });
      });
  });
});
