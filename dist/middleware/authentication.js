'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checkUserSession;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Check if logged-in user has a valid session token
 * @param{Object} req - api request
 * @param{Object} res - route response
 * @param{Object} next - jumping to next handler
 * @return{undefined}
 */
function checkUserSession(req, res, next) {
  var token = req.body.token || req.headers.token;
  if (!token) {
    res.status(401).send({ message: 'session token is required!' });
  } else {
    // Check if token matches the one provided at login
    _jsonwebtoken2.default.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        res.status(401).send({ message: 'invalid session token!' });
      } else {
        req.user = decoded;
        next();
      }
    });
  }
}