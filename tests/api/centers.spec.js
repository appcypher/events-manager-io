import { expect } from 'chai';
import request from 'supertest';
import bcrypt from 'bcrypt';
import server from '../../server/server';
import { User, EventCenter } from '../../server/models';

const hash = bcrypt.hashSync;

const createAdminUsers = () => {
  User.create({
    username: 'bayo', email: 'bayo@gmail.com', password: hash('bayo', 10), fullname: 'Bayo', admin: true,
  });
  User.create({
    username: 'sayo', email: 'sayo@gmail.com', password: hash('sayo', 10), fullname: 'Sayo', admin: true,
  });
};

const createNormalUsers = () => {
  User.create({
    username: 'ben', email: 'ben@gmail.com', password: hash('ben', 10), fullname: 'Ben', admin: false,
  });
  User.create({
    username: 'dan', email: 'dan@gmail.com', password: hash('dan', 10), fullname: 'Dan', admin: false,
  });
  User.create({
    username: 'tunde', email: 'tunde@gmail.com', password: hash('tunde', 10), fullname: 'Tunde', admin: false,
  });
  User.create({
    username: 'jess', email: 'jess@gmail.com', password: hash('jess', 10), fullname: 'Jess', admin: false,
  });
  User.create({
    username: 'tonya', email: 'tonya@gmail.com', password: hash('tonya', 10), fullname: 'Tonya', admin: false,
  });
};

const createCenter = () => {
  EventCenter.create({
    name: 'Johnson\'s Hall', type: 'Multipurpose Hall', price: 15000, location: 'Abuja', userId: 1,
  });
};

createNormalUsers();
createAdminUsers();
createCenter();

describe('Centers', () => {
  it('(GET /api/v1/centers/) should return 200 if available', (done) => {
    request(server)
      .post('/api/v1/users/login')
      .send({ username: 'ben', password: 'ben' })
      .end(() => {
        request(server)
          .get('/api/v1/centers')
          .end((err2, res2) => {
            expect(res2.status).to.equal(200);
            expect(res2.body.centers).to.be.an('array');
            expect(res2.body.centers[0].events).to.be.an('array');
            expect(res2.body.centers[0].events.length).to.be.below(11);
            expect(res2.body.message).to.equal('All centers delivered!');
            done();
          });
      });
  });

  it('(GET /centers/<centerId>) should return 200 if available', (done) => {
    request(server)
      .post('/api/v1/users/login')
      .send({ username: 'dan', password: 'dan' })
      .end(() => {
        request(server)
          .get('/api/v1/centers/1')
          .end((err2, res2) => {
            expect(res2.status).to.equal(200);
            expect(res2.body).to.be.an('object');
            expect(res2.body.center.events).to.be.an('array');
            expect(res2.body.center.events.length).to.be.below(11);
            expect(res2.body.message).to.equal('Center delivered!');
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
            expect(res2.body.center.userId).to.be.a('number');
            expect(res2.body.center.name).to.equal('Jake\'s Hall');
            expect(res2.body.center.price).to.be.a('number');
            expect(res2.body.message).to.equal('Center created!');
            done();
          });
      });
  });


  it('(POST /centers) should return 403 if user is not admin', (done) => {
    request(server)
      .post('/api/v1/users/login')
      .send({ username: 'tunde', password: 'tunde' })
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
            expect(res2.body.message).to.equal('You don\'t have enough permission to access this route!');
            done();
          });
      });
  });

  it('(POST /centers) should return 400 if name field is missing', (done) => {
    request(server)
      .post('/api/v1/users/login')
      .send({ username: 'jess', password: 'jess' })
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
            expect(res2.body.message).to.equal('name is required in body!');
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
            expect(res2.body.message).to.equal('price is required in body!');
            done();
          });
      });
  });

  it('(PUT /centers/<centerId>) should return 200 if user is admin', (done) => {
    request(server)
      .post('/api/v1/users/login')
      .send({ username: 'sayo', password: 'sayo' })
      .end((err, res) => {
        const { token } = res.body;
        request(server)
          .put('/api/v1/centers/2')
          .set('token', token)
          .send({
            name: 'New Hall', description: 'New shiny hall',
          })
          .end((err2, res2) => {
            expect(res2.status).to.equal(200);
            expect(res2.body.center.userId).to.be.a('number');
            expect(res2.body.center.price).to.be.a('number');
            expect(res2.body.center.name).to.equal('New Hall');
            expect(res2.body.center.type).to.equal('Multipurpose Hall');
            expect(res2.body.message).to.equal('Center modified!');
            done();
          });
      });
  });

  it('(PUT /centers/<centerId>) should return 403 if user is not admin', (done) => {
    request(server)
      .post('/api/v1/users/login')
      .send({ username: 'tonya', password: 'tonya' })
      .end((err, res) => {
        const { token } = res.body;
        request(server)
          .put('/api/v1/centers/2')
          .set('token', token)
          .send({
            name: 'New Hall', description: 'New shiny hall',
          })
          .end((err2, res2) => {
            expect(res2.status).to.equal(403);
            expect(res2.body.message).to.equal('You don\'t have enough permission to access this route!');
            done();
          });
      });
  });

  it('(GET /api/v1/centers/) should return 200 if centers with specified name exists', (done) => {
    request(server)
      .post('/api/v1/users/login')
      .send({ username: 'ben', password: 'ben' })
      .end(() => {
        request(server)
          .get('/api/v1/centers?name=J')
          .end((err2, res2) => {
            expect(res2.status).to.equal(200);
            expect(res2.body.centers).to.be.an('array');
            expect(res2.body.message).to.equal('All centers delivered!');
            done();
          });
      });
  });
});
