import express from 'express';
import path from 'upath';
import { createAdminUser } from '../controllers/user';

// Using express router
const router = express.Router();

// Home
router.route('/')
  .get((req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/../../template/index.html'));
  });

// Signup
router.route('/api/v1/users/')
  .post((req, res) => {
    res.status(200).send({ id: 1 });
  });

// Login
router.route('/api/v1/users/login')
  .post((req, res) => {
    res.status(200).send({ id: 2 });
  });

// NOTE: To be removed from source once first admin has been created
router.route('/api/v1/users/admin/ES4DafrwT3GVrtge553c5Ded4RrE4TFTft')
  .post(createAdminUser);

// 404 routes
router.route('*')
  .all((req, res) => {
    res.status(404).send({ error: 404 });
  });

export default router;
