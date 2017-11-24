'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = _models2.default.User,
    EventCenter = _models2.default.EventCenter,
    Event = _models2.default.Event;

var Validation = function () {
  function Validation() {
    _classCallCheck(this, Validation);
  }

  _createClass(Validation, null, [{
    key: 'checkPasswordMatch',

    /**
     * Checks if password matches the one sent by user
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @param{Function} next - next middleware
     * @return{undefined}
     */
    value: function checkPasswordMatch(req, res, next) {
      User.findOne({
        where: { username: req.body.username }
      }).then(function (user) {
        // Compare hashed password
        _bcrypt2.default.compare(req.body.password, user.password).then(function (check) {
          if (!check) {
            res.status(401).send({ status: 401, message: 'wrong password or username!' });
          } else next();
        });
      }).catch(function (err) {
        return res.status(400).send({ status: 400, message: err.errors[0].messsge || err });
      });
    }

    /**
     * Checks if request body contains required keys
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @param{Function} next - next middleware
     * @return{undefined}
     */

  }, {
    key: 'checkBodyContains',
    value: function checkBodyContains() {
      for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      return function (req, res, next) {
        params.forEach(function (p) {
          if (req.body[p] === undefined) {
            res.status(400).send({ status: 400, message: p + ' required in body!' });
          }
        });
        next();
      };
    }

    /**
     * Trims body keys
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @param{Function} next - next middleware
     * @return{undefined}
     */

  }, {
    key: 'trimBodyKeys',
    value: function trimBodyKeys(req, res, next) {
      // trim body keys
      Object.keys(req.body).forEach(function (k) {
        req.body[k.trim()] = req.body[k];
      });
      next();
    }

    /**
     * Trims body values passed to it
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @param{Function} next - next middleware
     * @return{undefined}
     */

  }, {
    key: 'trimBodyValues',
    value: function trimBodyValues() {
      for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        params[_key2] = arguments[_key2];
      }

      return function (req, res, next) {
        // trim body values
        params.forEach(function (p) {
          if (req.body[p] !== undefined) req.body[p] = req.body[p].trim(); // trim value if body exist
        });
        next();
      };
    }

    /**
     * Checks if username already exists
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @param{Function} next - next middleware
     * @return{undefined}
     */

  }, {
    key: 'checkUsernameExists',
    value: function checkUsernameExists(req, res, next) {
      User.findOne({
        where: { username: req.body.username }
      }).then(function (user) {
        if (!user) {
          res.status(404).send({ message: 'username does not exist!' });
        } else next();
      }).catch(function (err) {
        return res.status(400).send({ message: err.errors[0].messsge || err });
      });
    }

    /**
     * Checks if username already exists
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @param{Function} next - next middleware
     * @return{undefined}
     */

  }, {
    key: 'checkUsernameNotExists',
    value: function checkUsernameNotExists(req, res, next) {
      User.findOne({
        where: { username: req.body.username }
      }).then(function (user) {
        if (user) {
          res.status(409).send({ message: 'username already taken!' });
        } else next();
      }).catch(function (err) {
        return res.status(400).send({ message: err.errors[0].messsge || err });
      });
    }

    /**
     * Checks if email already exists
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @param{Function} next - next middleware
     * @return{undefined}
     */

  }, {
    key: 'checkEmailNotExists',
    value: function checkEmailNotExists(req, res, next) {
      User.findOne({
        where: { email: req.body.email }
      }).then(function (user) {
        if (user) {
          res.status(409).send({ message: 'email already taken!' });
        } else next();
      }).catch(function (err) {
        return res.status(400).send({ message: err.errors[0].messsge || err });
      });
    }

    /**
     * Checks if center already exists
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @param{Function} next - next middleware
     * @return{undefined}
     */

  }, {
    key: 'checkParamsValid',
    value: function checkParamsValid(req, res, next) {
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

  }, {
    key: 'checkCenterExists',
    value: function checkCenterExists(req, res, next) {
      EventCenter.findOne({
        where: { id: req.params.centerId }
      }).then(function (center) {
        if (center === undefined || center === null) {
          res.status(404).send({ message: 'cannot find specified event center!' });
        } else next();
      }).catch(function (err) {
        return res.status(400).send({ message: err.errors[0].messsge || err });
      });
    }

    /**
     * Checks if event date is not already taken
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @param{Function} next - next middleware
     * @return{undefined}
     */

  }, {
    key: 'checkDateNotTaken',
    value: function checkDateNotTaken(req, res, next) {
      var dateRegex = /^201[7-8]-[0-9][0-9]-[0-3][0-9]$/;
      if (req.body.date != null && req.body.date.match(dateRegex) == null) {
        res.status(404).send({ message: 'date format invalid, use format "YYYY-MM-DD"!' });
      } else {
        Event.findOne({
          where: {
            center: req.body.center,
            date: req.body.date != null ? new Date(req.body.date).toISOString() : null
          }
        }).then(function (event) {
          if (event) {
            res.status(404).send({ message: 'event already slated for that date!' });
          } else next();
        }).catch(function (err) {
          return res.status(400).send({ message: err.errors[0].messsge || err });
        });
      }
    }

    /**
     * Checks if event already exists
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @param{Function} next - next middleware
     * @return{undefined}
     */

  }, {
    key: 'checkEventExists',
    value: function checkEventExists(req, res, next) {
      Event.findOne({
        where: {
          id: req.params.eventId,
          user: req.user.id // User ids must match too
        }
      }).then(function (event) {
        if (event == null) {
          res.status(404).send({ message: 'cannot find specified event!' });
        } else next();
      }).catch(function (err) {
        return res.status(400).send({ message: err.errors[0].messsge || err });
      });
    }
  }]);

  return Validation;
}();

exports.default = Validation;