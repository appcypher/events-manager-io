'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _upath = require('upath');

var _upath2 = _interopRequireDefault(_upath);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _router = require('./routes/router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Set up the express app
var app = (0, _express2.default)();

// Load config files
_dotenv2.default.config();
console.log(process.env.SECRET_KEY);

// Port to listen from should be determined by evironment and defaults to 3000
var port = process.env.PORT || 3000;

// Log requests to the console.
app.use((0, _morgan2.default)('dev'));

// Parse incoming requests data
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

// Set template folder
// This must be before setting the router
app.use('/', _express2.default.static(_upath2.default.join(__dirname, '/../../template')));

// Set router
app.use('/', _router2.default);

// Open port and listen from it
app.listen(port, function () {
  console.log('Listening on port ' + port + '!');
});

exports.default = app;