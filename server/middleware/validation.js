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
          return res.status(400).send({ message: `${p} is required in body!` });
        }
      }
      return next();
    };
  }

  /**
   * Checks if specified body keys are not null
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{undefined}
   */
  static checkNotNull(...params) {
    return (req, res, next) => {
      /* eslint-disable no-restricted-syntax */
      for (const p of params) {
        if (req.body[p] !== undefined) {
          if (req.body[p] === null) {
            const key = p[0].toUpperCase() + p.slice(1);
            return res.status(400).send({ message: `${key} needs to have a value!` });
          }
        }
      }
      return next();
    };
  }

  /**
   * Checks if specified body keys are not an empty strings
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{undefined}
   */
  static checkNotEmpty(...params) {
    return (req, res, next) => {
      /* eslint-disable no-restricted-syntax */
      for (const p of params) {
        if (req.body[p] !== undefined) {
          if (req.body[p] === '') {
            const key = p[0].toUpperCase() + p.slice(1);
            return res.status(400).send({ message: `${key} can't be empty!` });
          }
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
          return res.status(400).send({ message: `Expects query(${q.name}) to have a type of ${q.type}!` });
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
          res.status(409).send({ message: 'Username has been taken!' });
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
          res.status(409).send({ message: 'Email has been taken!' });
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
        res.status(400).send({ message: 'Parameter type is not supported: use integer parameters!' });
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
            res.status(404).send({ message: 'Specified event center does not exist!' });
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
    if (req.body.date) {
      // Check date isn't empty.
      if (req.body.date === '') {
        return res.status(400).send({ message: 'Invalid date: Make sure it is in YYYY-MM-DD format!' });
      }
      // Check date format
      if (!req.body.date.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)) {
        return res.status(400).send({ message: 'Invalid date: Make sure it is in YYYY-MM-DD format!' });
      }

      // Check date range, .i.e, no invalid day or month value
      if (isNaN(new Date(req.body.date))) {
        return res.status(400).send({ message: 'Invalid date: Make sure it is in YYYY-MM-DD format!' });
      }
    }

    return next();
  }

  /**
   * Checks if event date is valid
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{undefined}
   */
  static checkTimeValid(req, res, next) {
    if (req.body.time) {
      // Check time isn't empty.
      if (req.body.time === '') {
        return res.status(400).send({ message: 'Invalid time: Make sure it is in 24-hour HH:MM format!' });
      }

      // Check time format.
      if (!req.body.time.match(/^([0-9]|[0-1][0-9]|2[0-3])\s*:\s*([0-9]|[0-5][0-9])$/)) {
        return res.status(400).send({ message: 'Invalid time: Make sure it is in 24-hour HH:MM format!' });
      }
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

    // Check date is deined in body.
    if (req.body.date) {
      const { date } = req.body;

      const lowDate = new Date(`${date} 00:00`).toISOString();
      const upDate = new Date(`${date} 23:59`).toISOString();

      // Check centerId is defined in body.
      if (req.body.centerId) {
        const { centerId } = req.body;

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
            if (events) {
              // Checking if no event is found with conflicting schedule.
              if (
                events.length === 0 ||
                (eventId && events.some(el => Number(el.id) === Number(eventId)))) {
                next();
              } else res.status(409).send({ message: 'An event has already been slated for that date!' });
            }
          })
          .catch((err) => {
            res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
          });

        // If centerId is not defined in body.
      } else {
        Event.findById(eventId)
          .then((event) => {
            if (event) {
              Event.findAll({
                where: {
                  centerId: event.centerId,
                  $and: [
                    { date: { $gte: lowDate } },
                    { date: { $lte: upDate } },
                  ],
                },
              })
                .then((events) => {
                  if (events) {
                    // Checking if no event is found with conflicting schedule.
                    if (
                      events.length === 0 ||
                      (eventId && events.some(el => Number(el.id) === Number(eventId)))) {
                      next();
                    } else res.status(409).send({ message: 'An event has already been slated for that date!' });
                  }
                })
                .catch((err) => {
                  res.status(400).send({
                    message: err.errors ? err.errors[0].message : err.message,
                  });
                });
            } else res.status(400).send({ message: 'CenterId is required in body!' });
          })
          .catch((err) => {
            res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
          });
      }
    } else next();
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
          return res.status(404).send({ message: 'Event does not exist!' });
        }

        if (event.userId !== req.user.id) { // User ids must match too
          return res.status(403).send({ message: 'You do not own this event!' });
        }

        return next();
      })
      .catch((err) => {
        res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
      });
  }
}

export default Validation;
