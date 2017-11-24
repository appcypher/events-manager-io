'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = _models2.default.User;

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: 'createUser',

    /**
     * Creates a new user with a hashed password and creates a session token for user
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @return{json} registered user details
     */
    value: function createUser(req, res) {
      // Hash password to save in the database
      var password = _bcrypt2.default.hashSync(req.body.password, 10);
      User.create({
        username: req.body.username,
        password: password,
        email: req.body.email,
        fullname: req.body.fullname,
        admin: false
      }).then(function (user) {
        var token = _jsonwebtoken2.default.sign( // Create a session token with 30-minute session
        { id: user.id, admin: false }, process.env.SECRET_KEY, { expiresIn: '30m' });
        res.status(201).send({ message: 'user created!', data: user, token: token });
      }).catch(function (err) {
        return res.status(400).send({ message: err.errors[0].messsge || err });
      });
    }

    /**
     * Creates a session token for user
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @return{string} log-in status
     */

  }, {
    key: 'loginUser',
    value: function loginUser(req, res) {
      User.findOne({
        where: { username: req.body.username }
      }).then(function (user) {
        var token = _jsonwebtoken2.default.sign( // Create a session token with 30-minute session
        { id: user.id, admin: user.admin }, process.env.SECRET_KEY, { expiresIn: '30m' });
        res.status(200).send({ message: 'user logged in!', token: token });
      }).catch(function (err) {
        return res.status(400).send({ message: err.errors[0].messsge || err });
      });
    }

    /**
     * Creates an admin user with a hashed password
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @return{string} registered user details
     */

  }, {
    key: 'createAdminUser',
    value: function createAdminUser(req, res) {
      // Hash password to save in the database
      var passwordHash = _bcrypt2.default.hashSync('admin', 10);
      User.create({
        username: 'admin',
        password: passwordHash,
        fullname: 'Steve Akinyemi',
        email: 'admin@events-manager-io.herokuapp.com',
        admin: true
      }).then(function (user) {
        var token = _jsonwebtoken2.default.sign( // Create a session token with 30-minute session
        { id: user.id, admin: true }, process.env.SECRET_KEY, { expiresIn: '30m' });
        res.status(201).send({
          status: 201, message: 'Admin user created!', data: user, token: token
        });
      }).catch(function (err) {
        return res.status(400).send({ status: 400, message: err.errors[0].messsge || err });
      });
    }
  }]);

  return UserController;
}();

exports.default = UserController;