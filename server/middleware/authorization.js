import jwt from 'jsonwebtoken';

/**
 * Check if user is an admin  and has certain access privileges
 * e.g modifying existing centers
 * @param{Object} req - api request
 * @param{Object} res - route response
 * @param{Object} next - jumping to next handler
 * @return{undefined}
 */
export default function checkUserAdmin(req, res, next) {
  const token = req.body.token || req.headers.token;
  if (!token) {
    res.status(401).send({ message: 'Token is required!' });
  } else {
    // Check if token matches the one provided at login
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      // Check id session is of admin
      if (decoded.admin !== true) {
        res.status(403).send({ message: 'You don\'t have enough permission to access this route!' });
      } else next();
    });
  }
}
