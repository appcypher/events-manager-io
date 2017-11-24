import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';

chai.use(chaiHttp);

describe('Centers', () => {
  it('should get all centers on GET /centers/');
  it('should get a single center on GET /centers/<centerId>');
  it('should add a new center on POST /centers');
  it('should modify the details of a center on PUT /centers/<centerId>');
});
