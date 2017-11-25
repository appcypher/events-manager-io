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
      params.forEach((p) => {
        if (req.body[p] === undefined) {
          res.status(400).send({ status: 400, message: `${p} required in body!` });
        }
      });
      next();
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
   * Checks if center already exists
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{undefined}
   */
  static checkParamsValid(req, res, next) {
    if (!Number.isInteger(parseInt(req.params.centerId, 10))) {
      res.status(404).send({ message: 'param type is not invalid!' });
    } else next();
  }

  /**
   * Checks if center already exists
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
        if (center === undefined || center === null) {
          res.status(404).send({ message: 'cannot find specified event center!' });
        } else next();
      })
      .catch(err => res.status(400).send({ message: err.errors[0].message || err }));
  }

  /**
   * Checks if event date is not already taken
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{undefined}
   */
  static checkDateNotTaken(req, res, next) {
    const dateRegex = /^201[7-8]-[0-9][0-9]-[0-3][0-9]$/;
    if (req.body.date != null && req.body.date.match(dateRegex) == null) {
      res.status(404).send({ message: 'date format invalid, use format "YYYY-MM-DD"!' });
    } else {
      Event
        .findOne({
          where: {
            center: req.body.center,
            date: req.body.date != null ? new Date(req.body.date).toISOString() : null,
          },
        })
        .then((event) => {
          if (event) {
            res.status(404).send({ message: 'event already slated for that date!' });
          } else next();
        })
        .catch(err => res.status(400).send({ message: err.errors[0].message || err }));
    }
  }

  /**
   * Checks if event already exists
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{undefined}
   */
  static checkEventExists(req, res, next) {
    Event
      .findOne({
        where: {
          id: req.params.eventId,
          user: req.user.id, // User ids must match too
        },
      })
      .then((event) => {
        if (event == null) {
          res.status(404).send({ message: 'cannot find specified event!' });
        } else next();
      })
      .catch(err => res.status(400).send({ message: err.errors[0].message || err }));
  }
}

export default Validation;
