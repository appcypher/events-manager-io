import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';

chai.use(chaiHttp);

describe('Users', () => {
  const userSignup = {
    username: 'jegede', password: 'jinadu', email: 'jinadu@yahoo.com', fullname: 'Jegede Jinadu',
  };

  const userLogin = {
    username: 'jegede', password: 'jinadu',
  };

  // SIGN UP
  it('(POST /api/v1/users) should respond with 201', (done) => {
    chai.request(server)
      .post('/api/v1/users')
      .send(userSignup)
      .end((err, res) => {
        res.body.SUCCESS.message.should.equal('user created!');
        res.should.have.status(201);
        // res.should.be.a('object');
        done();
      });
  });

});
