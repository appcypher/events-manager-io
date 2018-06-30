import db from '../models';

const { User, EventCenter, Event } = db;

class Validation {
  /**
   * Checks if request body contains required keys
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{undefined}
   */
  static checkBodyContains(...params) {
    return (req, res, next) => {
      /* eslint-disable no-restricted-syntax */
      for (const p of params) {
        if (req.body[p] === undefined) {
          return res.status(400).send({ message: `${p} required in body!` });
        }
      }
      return next();
    };
  }

  /**
   * Checks if request queries have the valid types.
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{undefined}
   */
  static checkQueriesValid(...queries) {
    return (req, res, next) => {
      /* eslint-disable no-restricted-syntax */
      /* eslint-disable valid-typeof */
      for (const q of queries) {
        if (typeof q.converter(req.query[q.name]) !== q.type) {
          return res.status(400).send({ message: `expects query(${q.name}) to have a type of ${q.type}!` });
        }
      }
      return next();
    };
  }

  /**
   * Trims body values
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{undefined}
   */
  static trimBodyValues(req, res, next) {
    // trim body values
    if (req.body) {
      Object.keys(req.body).forEach((k) => {
        const value = req.body[k];
        if ((typeof value === 'string' || value instanceof String) && value !== undefined) req.body[k] = req.body[k].trim(); // trim value if body exist
      });
    }
    next();
  }

  /**
   * Checks if username already exists
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{undefined}
   */
  static checkUsernameNotExists(req, res, next) {
    User
      .findOne({
        where: { username: req.body.username },
      })
      .then((user) => {
        if (user) {
          res.status(409).send({ message: 'username already taken!' });
        } else next();
      })
      .catch((err) => {
        res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
      });
  }

  /**
   * Checks if email already exists
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{undefined}
   */
  static checkEmailNotExists(req, res, next) {
    User
      .findOne({
        where: { email: req.body.email },
      })
      .then((user) => {
        if (user) {
          res.status(409).send({ message: 'email already taken!' });
        } else next();
      })
      .catch((err) => {
        res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
      });
  }

  /**
   * Checks if param value is an integer
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{undefined}
   */
  static checkParamValid(value) {
    return (req, res, next) => {
      if (!req.params[value].match(/^[0-9]+$/)) {
        res.status(400).send({ message: 'parameter type is not supported! - use integer parameters' });
      } else next();
    };
  }

  /**
   * Checks if centerId in body exists
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{undefined}
   */
  static checkAssociatedCenterExists(req, res, next) {
    if (req.body.centerId) {
      EventCenter
        .findOne({
          where: { id: req.body.centerId },
        })
        .then((center) => {
          if (center == null) {
            res.status(404).send({ message: 'specified event center does not exist!' });
          } else next();
        })
        .catch((err) => {
          res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
        });
    } else next();
  }

  /**
   * Checks if event date is valid
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{undefined}
   */
  /* eslint-disable no-restricted-globals */
  static checkDateValid(req, res, next) {
    // Check if body contains a date key
    if (!req.body.date) return next();

    // Check date format
    if (!req.body.date.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)) {
      return res.status(400).send({ message: 'date format is invalid! - make sure it is in YYYY-MM-DD format' });
    }
    // Check date range, .i.e, no invalid day or month value
    if (isNaN(new Date(req.body.date))) {
      return res.status(400).send({ message: 'date format is invalid! - make sure it is in YYYY-MM-DD format' });
    } return next();
  }

  /**
   * Checks if event date is valid
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{undefined}
   */
  static checkTimeValid(req, res, next) {
    // Check if body contains a date key
    if (!req.body.time) return next();

    // Check time format
    if (!req.body.time.match(/^([0-9]|[0-1][0-9]|2[0-3])\s*:\s*([0-9]|[0-5][0-9])$/)) {
      return res.status(400).send({ message: 'time format is invalid! - make sure it is in 24-hour HH:MM format' });
    }

    return next();
  }

  /**
   * Checks if event date is not already taken
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{undefined}
   */
  static checkDateNotTaken(req, res, next) {
    const { eventId } = req.params;
    const { centerId, date } = req.body;

    const lowDate = new Date(`${date} 00:00`).toISOString();
    const upDate = new Date(`${date} 23:59`).toISOString();

    Event.findAll({
      where: {
        centerId,
        $and: [
          { date: { $gte: lowDate } },
          { date: { $lte: upDate } },
        ],
      },
    })
      .then((events) => {
        // If no event is found with conflicting schedule.
        if (events.length === 0) {
          next();
        // If there are events with conflicting schedule and any of the event
        // has the same id as the provided eventId.
        } else if (eventId && events.some(el => Number(el.id) === Number(eventId))) {
          next();
        } else {
          res.status(409).send({ message: 'event already slated for that date!' });
        }
      })
      .catch((err) => {
        res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
      });
  }

  /**
   * Checks if user doesn't have an event with specified id
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{undefined}
   */
  static checkUserOwnEvent(req, res, next) {
    Event
      .findOne({
        where: {
          id: req.params.eventId,
        },
      })
      .then((event) => {
        if (event == null) {
          return res.status(404).send({ message: 'event does not exist!' });
        }

        if (event.userId !== req.user.id) { // User ids must match too
          return res.status(403).send({ message: 'you do not own this event!' });
        }

        return next();
      })
      .catch((err) => {
        res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
      });
  }
}

export default Validation;
