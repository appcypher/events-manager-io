'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventCenter = _models2.default.EventCenter,
    Event = _models2.default.Event;

var EventCenterController = function () {
  function EventCenterController() {
    _classCallCheck(this, EventCenterController);
  }

  _createClass(EventCenterController, null, [{
    key: 'createCenter',

    /**
     * Creates a new center
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @return{json}
     */
    value: function createCenter(req, res) {
      EventCenter.create({
        name: req.body.name,
        description: req.body.description || null,
        type: req.body.type,
        price: req.body.price,
        location: req.body.location,
        user: req.user.id
      }).then(function (center) {
        res.status(201).send({ message: 'center created!', data: center });
      }).catch(function (err) {
        return res.status(400).send({ message: err.errors[0].messsge || err });
      });
    }

    /**
     * Modifies an existing center
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @return{json}
     */

  }, {
    key: 'modifyCenter',
    value: function modifyCenter(req, res) {
      EventCenter.findOne({ where: { id: req.params.centerId } }).then(function (center) {
        if (center) {
          center.update({
            name: req.body.name || center.name,
            description: req.body.description || center.description,
            type: req.body.type || center.type,
            price: req.body.price || center.price,
            location: req.body.location || center.location
          });
          res.status(200).send({ message: 'center modified!', data: center });
        } else {
          res.status(404).send({ message: 'cannot find specified center!' });
        }
      }).catch(function (err) {
        return res.status(400).send({ message: err.errors[0].messsge || err });
      });
    }

    /**
     * Get all centers
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @return{json}
     */

  }, {
    key: 'getAllCenters',
    value: function getAllCenters(req, res) {
      EventCenter.all().then(function (centers) {
        return res.status(200).send({ message: 'all centers gotten!', data: centers });
      }).catch(function (err) {
        return res.status(400).send({ message: err.errors[0].messsge || err });
      });
    }

    /**
     * Get a particular center and associated events
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @return{json}
     */

  }, {
    key: 'getCenter',
    value: function getCenter(req, res) {
      EventCenter.findById(req.params.centerId, {
        include: [{
          model: Event,
          as: 'events'
        }]
      }).then(function (center) {
        res.status(200).send({ message: 'center gotten!', data: center });
      }).catch(function (err) {
        return res.status(400).send({ message: err.errors[0].messsge || err });
      });
    }
  }]);

  return EventCenterController;
}();

exports.default = EventCenterController;