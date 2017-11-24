import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';

chai.should();
chai.use(chaiHttp);

describe('Events', () => {
  const eventCreate = {
    username: 'jegede', password: 'jinadu', email: 'jinadu@yahoo.com', fullname: 'Jegede Jinadu',
  };
  const eventEdit = {
    username: 'jegede', password: 'jinadu',
  };
  it('(POST /api/v1/users) should respond with 201');

  it('(POST /api/v1/users/login) should respond with 202 and a session token');
});

