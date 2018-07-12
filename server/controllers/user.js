import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models';

const { User } = db;

class UserController {
  /**
   * Creates a new user with a hashed password and creates a token for user
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json} registered user details
   */
  static createUser(req, res) {
    if (
      req.body.password === undefined ||
      req.body.password === null ||
      req.body.password.length < 5
    ) {
      res.status(400).send({ message: 'Password is too short!' });
    } else {
      // Hash password to save in the database
      const password = bcrypt.hashSync(req.body.password, 10);
      User
        .create({
          username: req.body.username,
          password,
          email: req.body.email,
          fullname: req.body.fullname,
          admin: false,
        })
        .then((user) => {
          const token = jwt.sign( // Create a token that lasts for a day
            { id: user.id, admin: false },
            process.env.SECRET_KEY,
            { expiresIn: '24h' },
          );
          const safeUser = user;
          safeUser.password = undefined;
          res.status(201).send({ message: 'User created!', user: safeUser, token });
        })
        .catch((err) => {
          res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
        });
    }
  }

  /**
   * Creates a session token for user
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{string} log-in status
   */
  static loginUser(req, res) {
    User
      .findOne({
        where: { username: req.body.username },
      })
      .then((user) => {
        if (user) { // If user exists
          // Compare hashed password
          bcrypt.compare(req.body.password, user.password).then((check) => {
            if (!check) { // If password does not match
              res.status(401).send({ message: 'Wrong password or username!' });
            } else {
              const safeUser = user;
              safeUser.password = undefined;
              // Create a token that lasts for an hour
              const token = jwt.sign({ id: user.id, admin: user.admin }, process.env.SECRET_KEY, { expiresIn: '60m' });
              res.status(200).send({ message: 'User logged in!', user: safeUser, token });
            }
          });
        } else {
          res.status(401).send({ message: 'Wrong password or username!' });
        }
      })
      .catch((err) => {
        res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
      });
  }

  /**
   * Gets the user's details and associated events
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json} registered user details
   */
  static getUser(req, res) {
    User
      .findById(req.user.id)
      .then((user) => {
        const safeUser = user;
        safeUser.password = undefined;
        res.status(200).send({ message: 'User details delivered!', user: safeUser });
      })
      .catch((err) => {
        res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
      });
  }

  /**
   * Modify user's details
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json} registered user details
   */
  static modifyUserProfile(req, res) {
    User
      .findOne({ where: { id: req.user.id } })
      .then((user) => {
        if (user) {
          user
            .update({
              fullname: req.body.fullname || user.fullname,
              description: req.body.description || user.description,
              tagline: req.body.tagline || user.tagline,
              picture: req.body.picture || user.picture,
            })
            .then((modifiedUser) => {
              const safeUser = modifiedUser;
              safeUser.password = undefined;
              res.status(200).send({ message: 'User profile updated!', user: safeUser });
            })
            .catch((err) => {
              res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
            });
        } else {
          res.status(403).send({ message: 'You can only modify your own profile!' });
        }
      })
      .catch((err) => {
        res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
      });
  }

  /**
   * TODO: Remove endpoint as well.
   * Logs out user
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json} registered user details
   */
  static logoutUser(req, res) { res.status(200).send({ message: 'User logged out!' }); }
}

export default UserController;
