import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';

chai.use(chaiHttp);

describe('Events', () => {
  it('should add new event on POST /events/');
  it('should modify an event on PUT /events/<eventId>');
  it('should delete an event on DELETE /events/<eventId>');
});

