import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';

const should = chai.should();
chai.use(chaiHttp);

describe('Users', () => {
  it('(POST /users) should respond with the newly signed-up user data');
  it('(POST /users/login) should respond with a session token');
  it('(POST /users/logout) should invalidate user session token');
});

describe('Events', () => {
  it('should add new event on POST /events/');
  it('should get all events on GET /events/');
  it('should modify an event on PUT /events/<eventId>');
  it('should delete an event on DELETE /events/<eventId>');
  it('should get a single event on GET /events/<eventId>');
});

describe('Centers', () => {
  it('(POST /users) should respond with the newly signed-up user data');
  it('should get all centers on GET /centers/');
  it('should get all centers with certain properties on GET /centers/search?property=value');
  it('should get a single center on GET /centers/<centerId>');
  it('should add a new center on POST /centers');
  it('should modify the details of a center on PUT /centers/<centerId>');
});
