import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';

chai.use(chaiHttp);

describe('Users', () => {
  const testUser = {
    username: 'jegede', password: 'jinadu', email: 'jinadu@yahoo.com', fullname: 'Jegede Jinadu',
  };
  it('(POST /users) should respond with 201', (done) => {
    chai.request(server)
      .post('/api/v1/users')
      .send(testUser)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('(POST /users/login) should respond with a session token');
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
