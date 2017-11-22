import bcrypt from 'bcrypt';
import db from '../models';

const { User } = db;

export default function checkUserPassword(req, res, next) {
  return User
    .findOne({
      where: { username: req.body.username },
    })
    .then((user) => {
      // Compare hashed password
      bcrypt.compare(req.body.password, user.password).then((check) => {
        if (!check) {
          res.status(401).send({ status: 401, message: 'Wrong password or username!' });
        } else next();
      });
    })
    .catch(err => res.status(400).send({ status: 400, message: err.errors[0].messsge || err }));
}
