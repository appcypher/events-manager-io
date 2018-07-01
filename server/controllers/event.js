import db from '../models';

const { Event, EventCenter } = db;

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
        userId: req.user.id,
        centerId: parseInt(req.body.centerId, 10),
        date: new Date(`${req.body.date} ${req.body.time}`).toISOString(),
      })
      .then((event) => {
        res.status(201).send({ message: 'Event created!', event });
      })
      .catch((err) => {
        res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
      });
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
            centerId: req.body.centerId || event.centerId,
            date: req.body.date != null ? new Date(req.body.date).toISOString() : event.date,
          });
          res.status(200).send({ message: 'Event modified!', event });
        } else {
          res.status(404).send({ message: 'Cannot find specified event!' });
        }
      })
      .catch((err) => {
        res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
      });
  }

  /**
   * Deletes a specific event
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json}
   */
  static deleteEvent(req, res) {
    Event
      .findOne({ where: { id: req.params.eventId } })
      .then((event) => {
        if (event) {
          event
            .destroy()
            .then(() => {
              res.status(200).send({ message: 'Event deleted!' });
            })
            .catch((err) => {
              res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
            });
        } else {
          res.status(404).send({ message: 'Cannot find specified event!' });
        }
      })
      .catch((err) => {
        res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
      });
  }


  /**
   * Gets details of all existing event
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json}
   */
  static getAllEvents(req, res) {
    const page = (req.query.page && Number(req.query.page) > 0) ? Number(req.query.page) : 1;
    const interval = 10;
    const offset = (page * interval) - interval;
    const limit = offset + interval;

    Event
      .findAndCountAll({
        offset,
        limit,
        where: { userId: req.user.id },
        include: [{ model: EventCenter, as: 'center' }],
      })
      .then((result) => {
        if (result.rows && result.rows !== []) {
          const maxExceeded = result.count < offset;
          if (!maxExceeded) {
            res.status(200).send({ message: 'All events delivered!', events: result.rows });
          } else {
            res.status(404).send({ message: 'Maximum page exceeded!' });
          }
        } else {
          res.status(404).send({ message: 'You have no event!' });
        }
      })
      .catch((err) => {
        res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
      });
  }
}

export default EventController;
