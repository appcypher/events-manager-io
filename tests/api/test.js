import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';

const should = chai.should();
chai.use(chaiHttp);

describe('Users', () => {
  it('(POST /users) should respond with the newly signed-up user data');
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
