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

  /**
   * Modifies an existing event
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json}
   */
  static modifyEvent(req, res) {
    Event
      .findOne({ where: { id: req.params.eventId } })
      .then((event) => {
        if (event) {
          event.update({
            title: req.body.title || event.title,
            description: req.body.description || event.description,
            center: req.body.center || event.center,
            date: req.body.date != null ? new Date(req.body.date).toISOString() : event.date,
          });
          res.status(200).send({ message: 'event modified!', data: event });
        } else {
          res.status(404).send({ message: 'cannot find specified event!' });
        }
      })
      .catch(err => res.status(400).send({ message: err.errors[0].messsge || err }));
  }
}

export default EventController;
