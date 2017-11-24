'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checkUserAdmin;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Check if user is an admin  and has certain access privileges
 * e.g modifying existing centers
 * @param{Object} req - api request
 * @param{Object} res - route response
 * @param{Object} next - jumping to next handler
 * @return{undefined}
 */
function checkUserAdmin(req, res, next) {
  var token = req.body.token || req.headers.token;
  if (!token) {
    res.status(401).send({ message: 'session token is required!' });
  } else {
    // Check if token matches the one provided at login
    _jsonwebtoken2.default.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      // Check id session is of admin
      if (decoded.admin !== true) {
        res.status(403).send({ message: 'you don\'t have enough permission to access this route!' });
      } else next();
    });
  }
}