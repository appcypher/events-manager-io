'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = _models2.default.Event;

var EventController = function () {
  function EventController() {
    _classCallCheck(this, EventController);
  }

  _createClass(EventController, null, [{
    key: 'createEvent',

    /**
     * Creates a new event
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @return{json}
     */
    value: function createEvent(req, res) {
      Event.create({
        title: req.body.title,
        description: req.body.description || null,
        center: req.body.center,
        user: req.user.id,
        date: new Date(req.body.date).toISOString()
      }).then(function (event) {
        res.status(201).send({ message: 'event created!', data: event });
      }).catch(function (err) {
        return res.status(400).send({ message: err.errors[0].messsge || err });
      });
    }

    /**
     * Modifies an existing event
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @return{json}
     */

  }, {
    key: 'modifyEvent',
    value: function modifyEvent(req, res) {
      Event.findOne({ where: { id: req.params.eventId } }).then(function (event) {
        if (event) {
          event.update({
            title: req.body.title || event.title,
            description: req.body.description || event.description,
            center: req.body.center || event.center,
            date: req.body.date != null ? new Date(req.body.date).toISOString() : event.date
          });
          res.status(200).send({ message: 'event modified!', data: event });
        } else {
          res.status(404).send({ message: 'cannot find specified event!' });
        }
      }).catch(function (err) {
        return res.status(400).send({ message: err.errors[0].messsge || err });
      });
    }

    /**
     * Modifies an existing event
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @return{json}
     */

  }, {
    key: 'deleteEvent',
    value: function deleteEvent(req, res) {
      Event.findOne({ where: { id: req.params.eventId } }).then(function (event) {
        if (event) {
          event.destroy().then(res.status(200).send({ message: 'event deleted!' }));
        } else {
          res.status(404).send({ message: 'cannot find specified event!' });
        }
      }).catch(function (err) {
        return res.status(400).send({ message: err.errors[0].messsge || err });
      });
    }
  }]);

  return EventController;
}();

exports.default = EventController;