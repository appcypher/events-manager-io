import db from '../models';

const { User } = db;

/**
 * Handles request for user sign-up
 * @param{Object} req - api request
 * @param{Object} res - route response
 * @return{json} registered user details
 */
export function createUser(req, res) {
  // Hash password to save in the database
  const password = bcrypt.hashSync(req.body.password, 10);
  return User
    .create({
      username: req.body.username,
      password,
      email: req.body.email,
      fullname: req.body.fullname,
      admin: false,
      picture: null,
      description: null,
      tagline: null,
    })
    .then(user =>
      res.status(201)
        .send(user))
    .catch(err =>
      res.status(400)
        .send(`${err.errors[0].message}!`));
}

/**
 * Handles request for sign-in with basic authentication
 * @param{Object} req - api request
 * @param{Object} res - route response
 * @return{string} log-in status
 */
export function loginUser(req, res) {
  return User
    .findOne({
      where: { username: req.body.username },
    })
    .then((user) => {
    })
    .catch(err =>
      res.status(400)
        .send(`${err.errors[0].message}!`));
}
