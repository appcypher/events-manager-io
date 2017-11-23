import express from 'express';
import path from 'upath';
import checkUserSession from '../middleware/authentication';
import checkUserAdmin from '../middleware/authorization';
import UserController from '../controllers/user';
import EventCenterController from '../controllers/center';
import Validation from '../middleware/validation';

// Using express router
const router = express.Router();

// Home
router.route('/')
  .get((req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/../../template/index.html'));
  });

// Signup
router.route('/api/v1/users/')
  .post(
    Validation.trimBodyKeys,
    Validation.trimBodyValues('username', 'password', 'email'),
    Validation.checkBodyContains('username', 'password', 'email', 'fullname'),
    Validation.checkUsernameNotExists,
    Validation.checkEmailNotExists,
    UserController.createUser,
  );

// Login
router.route('/api/v1/users/login')
  .post(
    Validation.trimBodyKeys,
    Validation.trimBodyValues('username', 'password'),
    Validation.checkBodyContains('username', 'password'),
    Validation.checkUsernameExists,
    Validation.checkPasswordMatch,
    UserController.loginUser,
  );

// Add center
router.route('/api/v1/users/centers')
  .post(
    Validation.trimBodyKeys,
    Validation.checkBodyContains('name', 'type', 'price', 'location'),
    checkUserSession,
    checkUserAdmin,
    EventCenterController.createCenter,
  );

// Modify center
router.route('/api/v1/users/centers/:centerId')
  .put(
    Validation.trimBodyKeys,
    checkUserSession,
    checkUserAdmin,
    Validation.checkParamsValid,
    Validation.checkCenterExists,
    EventCenterController.modifyCenter,
  );

// NOTE: To be removed from source once first admin has been created
router.route('/api/v1/users/admin/ES4DafrwT3GVrtge553c5Ded4RrE4TFTft')
  .post(UserController.createAdminUser);

// 404 routes
router.route('*')
  .all((req, res) => {
    res.status(404).send({ status: 404, message: 'This endpoint is not availaible' });
  });

export default router;
