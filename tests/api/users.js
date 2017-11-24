import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';

chai.use(chaiHttp);
const { expect } = chai;

describe('Users', () => {
  const userSignup = {
    username: 'jegede', password: 'jinadu', email: 'jinadu@yahoo.com', fullname: 'Jegede Jinadu',
  };

  const userLogin = {
    username: 'jegede', password: 'jinadu',
  };

  // First sign up should be successful
  it('(POST /api/v1/users) should create user', (done) => {
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

  // Signing up with the same email and password
  it('(POST /api/v1/users) should not create user on when email and username is reused', (done) => {
    chai.request(server)
      .post('/api/v1/users')
      .send(userSignup)
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res).to.be.json;
        done();
      });
  });
});
