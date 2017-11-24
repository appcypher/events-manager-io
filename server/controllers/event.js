import db from '../models';

const { Event } = db;

class EventController {
  /**
   * Creates a new event
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json}
   */
  static createEvent(req, res) {
    Event
      .create({
        title: req.body.title,
        description: req.body.description || null,
        center: req.body.center,
        user: req.user.id,
        date: new Date(req.body.date).toISOString(),
      })
      .then((event) => {
        res.status(201).send({ message: 'Event created!', data: event });
      })
      .catch(err => res.status(400).send({ message: err.errors[0].messsge || err }));
  }
}

export default EventController;
