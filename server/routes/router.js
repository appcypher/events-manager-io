import express from 'express';
import path from 'upath';
// import { checkUserSession } from '../middleware/authentication';
// import { checkUserAdmin } from '../middleware/authorization';
// import { checkUserPassword } from '../middleware/validation';
import { createUser, createAdminUser } from '../controllers/user';

// Using express router
const router = express.Router();

// Home
router.route('/')
  .get((req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/../../template/index.html'));
  });

// Signup
router.route('/api/v1/users/')
  .post(createUser);

// Login
router.route('/api/v1/users/login')
  .post();

// NOTE: To be removed from source once first admin has been created
router.route('/api/v1/users/admin/ES4DafrwT3GVrtge553c5Ded4RrE4TFTft')
  .post(createAdminUser);

// 404 routes
router.route('*')
  .all((req, res) => {
    res.status(404).send({ status: 404, message: 'This endpoint is not availaible' });
  });

export default router;
