'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _upath = require('upath');

var _upath2 = _interopRequireDefault(_upath);

var _authentication = require('../middleware/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

var _authorization = require('../middleware/authorization');

var _authorization2 = _interopRequireDefault(_authorization);

var _user = require('../controllers/user');

var _user2 = _interopRequireDefault(_user);

var _center = require('../controllers/center');

var _center2 = _interopRequireDefault(_center);

var _event = require('../controllers/event');

var _event2 = _interopRequireDefault(_event);

var _validation = require('../middleware/validation');

var _validation2 = _interopRequireDefault(_validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Using express router
var router = _express2.default.Router();

// Home
router.route('/').get(function (req, res) {
  res.status(200).sendFile(_upath2.default.join(__dirname, '/../../template/index.html'));
});

// Signup
router.route('/api/v1/users/').post(_validation2.default.trimBodyKeys, _validation2.default.trimBodyValues('username', 'password', 'email'), _validation2.default.checkBodyContains('username', 'password', 'email', 'fullname'), _validation2.default.checkUsernameNotExists, _validation2.default.checkEmailNotExists, _user2.default.createUser);

// Login
router.route('/api/v1/users/login').post(_validation2.default.trimBodyKeys, _validation2.default.trimBodyValues('username', 'password'), _validation2.default.checkBodyContains('username', 'password'), _validation2.default.checkUsernameExists, _validation2.default.checkPasswordMatch, _user2.default.loginUser);

// Add center
router.route('/api/v1/centers').post(_validation2.default.trimBodyKeys, _validation2.default.checkBodyContains('name', 'type', 'price', 'location'), _authentication2.default, _authorization2.default, _center2.default.createCenter);

// Modify center
router.route('/api/v1/centers/:centerId').put(_validation2.default.trimBodyKeys, _authentication2.default, _authorization2.default, _validation2.default.checkParamsValid, _validation2.default.checkCenterExists, _center2.default.modifyCenter);

// Get all centers
router.route('/api/v1/centers').get(_authentication2.default, _center2.default.getAllCenters);

// Get a center and associated events
router.route('/api/v1/centers/:centerId').get(_authentication2.default, _validation2.default.checkCenterExists, _center2.default.getCenter);

// Add event
router.route('/api/v1/events').post(_validation2.default.trimBodyKeys, _validation2.default.checkBodyContains('title', 'date', 'center'), _authentication2.default, _validation2.default.checkDateNotTaken, _event2.default.createEvent);

// Modify event
router.route('/api/v1/events/:eventId').put(_validation2.default.trimBodyKeys, _authentication2.default, _validation2.default.checkDateNotTaken, _validation2.default.checkEventExists, _event2.default.modifyEvent);

// Delete event
router.route('/api/v1/events/:eventId').delete(_validation2.default.trimBodyKeys, _authentication2.default, _validation2.default.checkEventExists, _event2.default.deleteEvent);

// NOTE: To be removed from source once first admin has been created
router.route('/api/v1/users/admin/ES4DafrwT3GVrtge553c5Ded4RrE4TFTft').post(_user2.default.createAdminUser);

// 404 routes
router.route('*').all(function (req, res) {
  res.status(404).send({ message: 'This endpoint is not availaible' });
});

exports.default = router;