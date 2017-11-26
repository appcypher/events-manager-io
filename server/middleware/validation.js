import bcrypt from 'bcrypt';
import db from '../models';

const { User, EventCenter, Event } = db;

class Validation {
  /**
   * Checks if password matches the one sent by user
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{undefined}
   */
  static checkPasswordMatch(req, res, next) {
    User
      .findOne({
        where: { username: req.body.username },
      })
      .then((user) => {
        // Compare hashed password
        bcrypt.compare(req.body.password, user.password).then((check) => {
          if (!check) {
            res.status(401).send({ status: 401, message: 'wrong password or username!' });
          } else next();
        });
      })
      .catch(err => res.status(400).send({ status: 400, message: err.errors[0].message || err }));
  }

  /**
   * Checks if request body contains required keys
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{undefined}
   */
  static checkBodyContains(...params) {
    return (req, res, next) => {
      let missingInBody = null;
      params.some((p) => {
        if (!missingInBody && req.body[p] == null) {
          missingInBody = req.body[p];
          return true;
        }
        return false;
      });
      if (missingInBody) return res.status(400).send({ message: `${missingInBody} required in body!` });
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
        if (req.body[k] !== undefined) req.body[k] = req.body[k].trim(); // trim value if body exist
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
  static checkUsernameExists(req, res, next) {
    User
      .findOne({
        where: { username: req.body.username },
      })
      .then((user) => {
        if (!user) {
          res.status(404).send({ message: 'username does not exist!' });
        } else next();
      })
      .catch(err => res.status(400).send({ message: err.errors[0].message || err }));
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
      .catch(err => res.status(400).send({ message: err.errors[0].message || err }));
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
      .catch(err => res.status(400).send({ message: err.errors[0].message || err }));
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
        res.status(404).send({ message: 'parameter type is not supported! - use integer parameters' });
      } else next();
    };
  }

  /**
   * Checks if centerId parameter already exists
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{undefined}
   */
  static checkCenterExists(req, res, next) {
    EventCenter
      .findOne({
        where: { id: req.params.centerId },
      })
      .then((center) => {
        if (center == null) {
          res.status(404).send({ message: 'cannot find specified event center!' });
        } else next();
      })
      .catch(err => res.status(400).send({ message: err.errors[0].message || err }));
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
        .catch(err => res.status(400).send({ message: err.errors[0].message || err }));
    }
    next();
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
      return res.status(404).send({ message: 'date format is invalid! - make sure it is in YYYY-MM-DD format' });
    }
    // Check date range, .i.e, no invalid day or month value
    if (isNaN(new Date(req.body.date))) {
      return res.status(404).send({ message: 'date format is invalid! - make sure it is in YYYY-MM-DD format' });
    } return next();
  }

  /**
   * Checks if event date is not already taken
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{undefined}
   */
  static checkDateNotTaken(req, res, next) {
    Event.findOne({ where: { id: req.params.eventId } })
      .then((event) => {
        Event
          .findOne({
            where: {
              centerId: req.body.centerId || event.centerId,
              date: req.body.date ? new Date(req.body.date).toISOString() : null,
            },
          })
          .then((slatedEvent) => {
            // Excluding current event
            /* eslint-disable eqeqeq */
            if (slatedEvent && (slatedEvent.id != req.params.eventId)) {
              res.status(404).send({ message: 'event already slated for that date!' });
            } else next();
          })
          .catch(err => res.status(400).send({ message: err.errors[0].message || err }));
      })
      .catch(err => res.status(400).send({ message: err.errors[0].message || err }));
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
      .catch(err => res.status(400).send({ message: err.errors[0].message || err }));
  }
}

export default Validation;
