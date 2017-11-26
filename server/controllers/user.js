import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models';

const { User } = db;

class UserController {
  /**
   * Creates a new user with a hashed password and creates a session token for user
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json} registered user details
   */
  static createUser(req, res) {
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
        const token = jwt.sign( // Create a session token with 30-minute session
          { id: user.id, admin: false },
          process.env.SECRET_KEY,
          { expiresIn: '30m' },
        );
        res.status(201).send({ message: 'user created!', token });
      })
      .catch(err => res.status(400).send({ message: err.errors[0].message || err }));
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
        const token = jwt.sign( // Create a session token with 30-minute session
          { id: user.id, admin: user.admin },
          process.env.SECRET_KEY,
          { expiresIn: '30m' },
        );
        res.status(200).send({ message: 'user logged in!', token });
      })
      .catch(err => res.status(400).send({ message: err.errors[0].message || err }));
  }
}

export default UserController;
