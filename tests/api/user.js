import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';

chai.should();
chai.use(chaiHttp);

describe('Users', () => {
  const userSignup = {
    username: 'jegede', password: 'jinadu', email: 'jinadu@yahoo.com', fullname: 'Jegede Jinadu',
  };
  const userLogin = {
    username: 'jegede', password: 'jinadu',
  };
  it('(POST /api/v1/users) should respond with 201', (done) => {
    chai.request(server)
      .post('/api/v1/users')
      .send(userSignup)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('(POST /api/v1/users/login) should respond with 202 and a session token', (done) => {
    chai.request(server)
      .post('/api/v1/users/login')
      .send(userLogin)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('Events', () => {
  it('should add new event on POST /events/');
  it('should modify an event on PUT /events/<eventId>');
  it('should delete an event on DELETE /events/<eventId>');
});

describe('Centers', () => {
  it('should get all centers on GET /centers/');
  it('should get a single center on GET /centers/<centerId>');
  it('should add a new center on POST /centers');
  it('should modify the details of a center on PUT /centers/<centerId>');
});
