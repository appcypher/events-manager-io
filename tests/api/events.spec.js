import { expect } from 'chai';
import moment from 'moment';
import request from 'supertest';
import bcrypt from 'bcrypt';
import server from '../../server/server';
import { User, Event, EventCenter } from '../../server/models';

const hash = bcrypt.hashSync;

const createAdminUser = () => {
  User.create({
    username: 'franklin', email: 'franklin@gmail.com', password: hash('franklin', 10), fullname: 'Franklin', admin: true,
  });
};

const createNormalUsers = () => {
  User.create({
    username: 'mark', email: 'mark@gmail.com', password: hash('mark', 10), fullname: 'Mark', admin: false,
  });
  User.create({
    username: 'thomas', email: 'thomas@gmail.com', password: hash('thomas', 10), fullname: 'Thomas', admin: false,
  });
  User.create({
    username: 'gabby', email: 'gabby@gmail.com', password: hash('gabby', 10), fullname: 'Gabby', admin: false,
  });
  User.create({
    username: 'emmanuel', email: 'emmanuel@gmail.com', password: hash('emmanuel', 10), fullname: 'Emmanuel', admin: false,
  });
  User.create({
    username: 'wande', email: 'wande@gmail.com', password: hash('wande', 10), fullname: 'Wande', admin: false,
  });
  User.create({
    username: 'ikenna', email: 'ikenna@gmail.com', password: hash('ikenna', 10), fullname: 'Ikenna', admin: false,
  });
  User.create({
    username: 'faith', email: 'faith@gmail.com', password: hash('faith', 10), fullname: 'Faith', admin: false,
  });
  User.create({
    username: 'demola', email: 'demola@gmail.com', password: hash('demola', 10), fullname: 'Demola', admin: false,
  });
  User.create({
    username: 'anaeze', email: 'anaeze@gmail.com', password: hash('anaeze', 10), fullname: 'Anaeze', admin: false,
  });
  User.create({
    username: 'albert', email: 'albert@gmail.com', password: hash('albert', 10), fullname: 'Albert', admin: false,
  });
  User.create({
    username: 'cain', email: 'cain@gmail.com', password: hash('cain', 10), fullname: 'Cain', admin: false,
  });
};

const createCenters = () => {
  EventCenter.create({
    name: 'Johnson\'s Hall', type: 'Multipurpose Hall', price: 15000, location: 'Abuja', userId: 1,
  });
  EventCenter.create({
    name: 'Harley\'s Hall', type: 'Multipurpose Hall', price: 30000, location: 'Lagos', userId: 1,
  });
};

createAdminUser();
createNormalUsers();
createCenters();

describe('Events', () => {
  it('(POST /api/v1/events/) should return 201 if admin user creates event', (done) => {
    request(server)
      .post('/api/v1/users/login')
      .send({ username: 'franklin', password: 'franklin' })
      .end((err, res) => {
        const { token, user: { id } } = res.body;

        // Extracting date information about two days from now.
        const twoDaysTime = moment().add(2, 'day').toISOString();
        const year = twoDaysTime.slice(0, 4);
        const month = twoDaysTime.slice(5, 7);
        const day = twoDaysTime.slice(8, 10);
        const date = `${year}-${month}-${day}`;

        request(server)
          .post('/api/v1/events')
          .set('token', token)
          .send({
            title: 'Jake\'s Birthday',
            description: 'Need to appear early',
            time: '15:00',
            date,
            centerId: 1,
            userId: id,
          })
          .end((err2, res2) => {
            expect(res2.status).to.equal(201);
            expect(res2.body.event).to.be.an('object');
            expect(res2.body.event.userId).to.be.a('number');
            expect(res2.body.event.title).to.equal('Jake\'s Birthday');
            expect(res2.body.message).to.equal('Event created!');
            done();
          });
      });
  });

  it('(POST /api/v1/events/) should return 201 if normal user creates event', (done) => {
    request(server)
      .post('/api/v1/users/login')
      .send({ username: 'mark', password: 'mark' })
      .end((err, res) => {
        const { token, user: { id } } = res.body;

        // Extracting date information about two days from now.
        const threeDaysTime = moment().add(3, 'day').toISOString();
        const year = threeDaysTime.slice(0, 4);
        const month = threeDaysTime.slice(5, 7);
        const day = threeDaysTime.slice(8, 10);
        const date = `${year}-${month}-${day}`;

        request(server)
          .post('/api/v1/events')
          .set('token', token)
          .send({
            title: 'Jake\'s Birthday',
            description: 'Need to appear early',
            time: '15:00',
            date,
            centerId: 1,
            userId: id,
          })
          .end((err2, res2) => {
            expect(res2.status).to.equal(201);
            expect(res2.body.event).to.be.an('object');
            expect(res2.body.event.userId).to.be.a('number');
            expect(res2.body.event.title).to.equal('Jake\'s Birthday');
            expect(res2.body.message).to.equal('Event created!');
            done();
          });
      });
  });

  it('(POST /api/v1/events/) should return 409 if same date has already been booked for center', (done) => {
    // Extracting date information about two days from now.
    const fourDaysTime = moment().add(4, 'day').toISOString();
    const year = fourDaysTime.slice(0, 4);
    const month = fourDaysTime.slice(5, 7);
    const day = fourDaysTime.slice(8, 10);
    const sameDate = `${year}-${month}-${day}`;
    const sameCenter = 1;

    // User Samuel has booked event for a center.
    User.create({
      username: 'samuel', email: 'samuel@gmail.com', password: hash('samuel', 10), fullname: 'Samuel', admin: false,
    })
      .then((user) => {
        if (user) {
          Event.create({
            title: 'Wedding',
            time: '12:00',
            date: sameDate,
            centerId: sameCenter,
            userId: user.id,
          });
        }
      });

    // User Thomas tries to book an event for the same center on the same date.
    request(server)
      .post('/api/v1/users/login')
      .send({ username: 'thomas', password: 'thomas' })
      .end((err, res) => {
        const { token, user: { id } } = res.body;

        request(server)
          .post('/api/v1/events')
          .set('token', token)
          .send({
            title: 'Jake\'s Birthday',
            description: 'Need to appear early',
            time: '15:00',
            date: sameDate,
            centerId: sameCenter,
            userId: id,
          })
          .end((err2, res2) => {
            expect(res2.status).to.equal(409);
            expect(res2.body.message).to.equal('An event has already been slated for that date!');
            done();
          });
      });
  });

  it('(POST /api/v1/events/) should return 404 if specified center does not exist', (done) => {
    request(server)
      .post('/api/v1/users/login')
      .send({ username: 'gabby', password: 'gabby' })
      .end((err, res) => {
        const { token, user: { id } } = res.body;

        // Extracting date information about two days from now.
        const fiveDaysTime = moment().add(5, 'day').toISOString();
        const year = fiveDaysTime.slice(0, 4);
        const month = fiveDaysTime.slice(5, 7);
        const day = fiveDaysTime.slice(8, 10);
        const date = `${year}-${month}-${day}`;

        request(server)
          .post('/api/v1/events')
          .set('token', token)
          .send({
            title: 'My indtroduction',
            time: '15:00',
            date,
            centerId: 17,
            userId: id,
          })
          .end((err2, res2) => {
            expect(res2.status).to.equal(404);
            expect(res2.body.message).to.equal('Specified event center does not exist!');
            done();
          });
      });
  });

  it('(POST /api/v1/events/) should return 400 if date format is invalid', (done) => {
    request(server)
      .post('/api/v1/users/login')
      .send({ username: 'emmanuel', password: 'emmanuel' })
      .end((err, res) => {
        const { token, user: { id } } = res.body;

        // Extracting date information about two days from now.
        const sixDaysTime = moment().add(6, 'day').toISOString();
        const year = sixDaysTime.slice(0, 4);
        const month = sixDaysTime.slice(5, 7);
        const day = sixDaysTime.slice(8, 10);
        const date = `${year}/${month}/${day}`;

        request(server)
          .post('/api/v1/events')
          .set('token', token)
          .send({
            title: 'My introduction',
            time: '15:00',
            date,
            centerId: 1,
            userId: id,
          })
          .end((err2, res2) => {
            expect(res2.status).to.equal(400);
            expect(res2.body).to.be.an('object');
            expect(res2.body.message).to.equal('Invalid date: Make sure it is in YYYY-MM-DD format!');
            done();
          });
      });
  });

  it('(POST /api/v1/events/) should return 400 if time format is invalid', (done) => {
    request(server)
      .post('/api/v1/users/login')
      .send({ username: 'wande', password: 'wande' })
      .end((err, res) => {
        const { token, user: { id } } = res.body;

        // Extracting date information about two days from now.
        const sixDaysTime = moment().add(6, 'day').toISOString();
        const year = sixDaysTime.slice(0, 4);
        const month = sixDaysTime.slice(5, 7);
        const day = sixDaysTime.slice(8, 10);
        const date = `${year}-${month}-${day}`;

        request(server)
          .post('/api/v1/events')
          .set('token', token)
          .send({
            title: 'My introduction',
            time: '05:00PM',
            date,
            centerId: 1,
            userId: id,
          })
          .end((err2, res2) => {
            expect(res2.status).to.equal(400);
            expect(res2.body).to.be.an('object');
            expect(res2.body.message).to.equal('Invalid time: Make sure it is in 24-hour HH:MM format!');
            done();
          });
      });
  });

  it('(PUT /api/v1/events/<eventId>) should return 200 if existing event modified successfully', (done) => {
    request(server)
      .post('/api/v1/users/login')
      .send({ username: 'ikenna', password: 'ikenna' })
      .end((err, res) => {
        const { token, user: { id } } = res.body;

        // Extracting date information about two days from now.
        const sevenDaysTime = moment().add(7, 'day').toISOString();
        const year = sevenDaysTime.slice(0, 4);
        const month = sevenDaysTime.slice(5, 7);
        const day = sevenDaysTime.slice(8, 10);
        const date = `${year}-${month}-${day}`;

        request(server)
          .post('/api/v1/events')
          .set('token', token)
          .send({
            title: 'My introduction',
            time: '05:00',
            date,
            centerId: 1,
            userId: id,
          })
          .end((err2, res2) => {
            const eventId = res2.body.event.id;
            request(server)
              .put(`/api/v1/events/${eventId}`)
              .set('token', token)
              .send({
                title: 'Project onboarding',
              })
              .end((err3, res3) => {
                expect(res3.status).to.equal(200);
                expect(res2.body.event).to.be.an('object');
                expect(res2.body.event.userId).to.be.a('number');
                expect(res2.body.event.title).to.equal('My introduction');
                expect(res3.body.message).to.equal('Event modified!');
                done();
              });
          });
      });
  });

  it('(PUT /api/v1/events/<eventId>) should return 403 if modified event was not created by user', (done) => {
    // Login first user
    request(server)
      .post('/api/v1/users/login')
      .send({ username: 'faith', password: 'faith' })
      .end((err, res) => {
        const { token, user: { id } } = res.body;

        // Extracting date information about two days from now.
        const eightDaysTime = moment().add(8, 'day').toISOString();
        const year = eightDaysTime.slice(0, 4);
        const month = eightDaysTime.slice(5, 7);
        const day = eightDaysTime.slice(8, 10);
        const date = `${year}-${month}-${day}`;

        // First user creates event
        request(server)
          .post('/api/v1/events')
          .set('token', token)
          .send({
            title: 'My introduction',
            time: '05:00',
            date,
            centerId: 1,
            userId: id,
          })
          .end((err2, res2) => {
            const eventId = res2.body.event.id;

            // Login second user.
            request(server)
              .post('/api/v1/users/login')
              .send({ username: 'demola', password: 'demola' })
              .end((err4, res4) => {
                const token2 = res4.body.token;
                // Second user tries to edit first user's event.
                request(server)
                  .put(`/api/v1/events/${eventId}`)
                  .set('token', token2)
                  .send({
                    title: 'Project onboarding',
                  })
                  .end((err3, res3) => {
                    expect(res3.status).to.equal(403);
                    expect(res3.body.message).to.equal('You do not own this event!');
                    done();
                  });
              });
          });
      });
  });

  it('(DELETE /api/v1/events/<eventId>) should return 200 if existing event deleted successfully', (done) => {
    request(server)
      .post('/api/v1/users/login')
      .send({ username: 'anaeze', password: 'anaeze' })
      .end((err, res) => {
        const { token, user: { id } } = res.body;

        // Extracting date information about two days from now.
        const ninthDaysTime = moment().add(9, 'day').toISOString();
        const year = ninthDaysTime.slice(0, 4);
        const month = ninthDaysTime.slice(5, 7);
        const day = ninthDaysTime.slice(8, 10);
        const date = `${year}-${month}-${day}`;

        request(server)
          .post('/api/v1/events')
          .set('token', token)
          .send({
            title: 'My introduction',
            time: '05:00',
            date,
            centerId: 1,
            userId: id,
          })
          .end((err2, res2) => {
            const eventId = res2.body.event.id;
            request(server)
              .delete(`/api/v1/events/${eventId}`)
              .set('token', token)
              .end((err3, res3) => {
                expect(res3.status).to.equal(200);
                expect(res3.body.message).to.equal('Event deleted!');
                done();
              });
          });
      });
  });

  it('(DELETE /api/v1/events/<eventId>) should return 404 if deleted event does not exist', (done) => {
    request(server)
      .post('/api/v1/users/login')
      .send({ username: 'albert', password: 'albert' })
      .end((err, res) => {
        const { token } = res.body;

        request(server)
          .delete('/api/v1/events/17')
          .set('token', token)
          .end((err2, res2) => {
            expect(res2.status).to.equal(404);
            expect(res2.body.message).to.equal('Event does not exist!');
            done();
          });
      });
  });

  it('(GET /api/v1/events) should return 200 if there are events available for a user', (done) => {
    request(server)
      .post('/api/v1/users/login')
      .send({ username: 'anaeze', password: 'anaeze' })
      .end((err, res) => {
        const { token } = res.body;
        request(server)
          .get('/api/v1/events')
          .set('token', token)
          .end((err3, res3) => {
            expect(res3.status).to.equal(200);
            expect(res3.body.events).to.be.an('array');
            expect(res3.body.message).to.equal('All events delivered!');
            done();
          });
      });
  });

  it('(GET /api/v1/events) should return 404 if requested page of events does not exist', (done) => {
    request(server)
      .post('/api/v1/users/login')
      .send({ username: 'anaeze', password: 'anaeze' })
      .end((err, res) => {
        const { token } = res.body;
        request(server)
          .get('/api/v1/events?page=200')
          .set('token', token)
          .end((err3, res3) => {
            expect(res3.status).to.equal(404);
            expect(res3.body.message).to.equal('Maximum page exceeded!');
            done();
          });
      });
  });
});
