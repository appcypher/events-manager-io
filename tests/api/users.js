import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';
/* eslint-disable no-unused-expressions  */

chai.use(chaiHttp);
const { expect } = chai;

describe('Users', () => {
  /* SIGNUP */
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
    const userSignup = {
      username: 'jegede', password: 'jinadu', email: 'jinadu@yahoo.com', fullname: 'Jegede Jinadu',
    };
    chai.request(server)
      .post('/api/v1/users')
      .send(userSignup)
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.message).to.equal('username already taken!');
        expect(res).to.be.json;
        done();
      });
  });

  it('(POST /api/v1/users) should 409 if username already exists', (done) => {
    const userSignup = {
      username: 'jinadu', password: 'jinadu', email: 'jegede@yahoo.com', fullname: 'Jegede Jinadu',
    };
    chai.request(server)
      .post('/api/v1/users')
      .send(userSignup)
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.message).to.equal('email already taken!');
        expect(res).to.be.json;
        done();
      });
  });

  it('(POST /api/v1/users) should 409 if email is not valid', (done) => {
    const userSignup = {
      username: 'jackson', password: 'jackson', email: 'jackson', fullname: 'Jackson',
    };
    chai.request(server)
      .post('/api/v1/users')
      .send(userSignup)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('email format is invalid!');
        expect(res).to.be.json;
        done();
      });
  });

  /* LOGIN */
  it('(POST /api/v1/users/login) should 201 if credentials valid', (done) => {
    const userLogin = {
      username: 'jegede', password: 'jegede',
    };
    chai.request(server)
      .post('/api/v1/users/login')
      .send(userLogin)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('user logged in!');
        expect(res).to.be.json;
        done();
      });
  });
});
