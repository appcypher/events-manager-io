import jwt from 'jsonwebtoken';

/**
 * Check if logged-in user has a valid session token
 * @param{Object} req - api request
 * @param{Object} res - route response
 * @param{Object} next - jumping to next handler
 * @return{undefined}
 */
export default function authenticate(req, res, next) {
  const token = req.body.token || req.headers.token;
  if (!token) {
    res.status(401).send({ message: 'Token is required!' });
  } else {
    // Check if token matches the one provided at login
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).send({ message: 'Invalid token!' });
      } else {
        req.user = decoded;
        next();
      }
    });
  }
}
