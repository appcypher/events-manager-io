import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';
/* eslint-disable no-unused-expressions  */

chai.use(chaiHttp);
const { expect } = chai;

describe('Users', () => {
  it('(POST /api/v1/users) should return 201 if successful', (done) => {
    const userSignup = {
      username: 'jegede', password: 'jegede', email: 'jegede@yahoo.com', fullname: 'Jegede Jinadu',
    };
    chai.request(server)
      .post('/api/v1/users')
      .send(userSignup)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('user created!');
        expect(res).to.be.json;
        done();
      });
  });

  it('(POST /api/v1/users) should return 409 if username already exists', (done) => {
    const userSignupExisting = {
      username: 'jegede', password: 'jinadu', email: 'jinadu@yahoo.com', fullname: 'Jegede Jinadu',
    };
    chai.request(server)
      .post('/api/v1/users')
      .send(userSignupExisting)
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.message).to.equal('username already taken!');
        expect(res).to.be.json;
        done();
      });
  });

  it('(POST /api/v1/users) should 409 if username already exists', (done) => {
    const userSignupExisting = {
      username: 'jinadu', password: 'jinadu', email: 'jegede@yahoo.com', fullname: 'Jegede Jinadu',
    };
    chai.request(server)
      .post('/api/v1/users')
      .send(userSignupExisting)
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.message).to.equal('email already taken!');
        expect(res).to.be.json;
        done();
      });
  });
});
