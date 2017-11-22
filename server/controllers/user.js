import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models';

const { User } = db;

/**
 * Creates a new user with a hashed password and creates a session token for user
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
 * Creates a session token for user
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
      // Create a session token with 30-minute session
      const token = jwt.sign({ username: user.username, admin: user.isadmin }, process.env.SECRET_KEY, { expiresIn: '30m' });
      res.status(200).send({ status: 200, message: 'Successfully Logged in!', token });
    })
    .catch(err => res.status(400).send(`${err.errors[0].message}!`));
}

/**
 * Creates an admin user with a hashed password
 * @param{Object} req - api request
 * @param{Object} res - route response
 * @return{string} registered user details
 */
export function createAdminUser(req, res) {
  // Hash password to save in the database
  const passwordHash = bcrypt.hashSync('admin', 10);
  return User
    .create({
      username: 'admin',
      password: passwordHash,
      fullname: 'Steve Akinyemi',
      email: 'admin@events-manager-io.herokuapp.com',
      admin: true,
      picture: null,
      description: null,
      tagline: null,
    })
    .then(user => res.status(201).send({ status: 201, message: 'User created', user }))
    .catch(err => res.status(400).send({ status: 400, message: err.errors[0].messsge || err }));
}
