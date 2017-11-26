import express from 'express';
import path from 'path';
import authenticate from '../middleware/authentication';
import checkUserAdmin from '../middleware/authorization';
import UserController from '../controllers/user';
import EventCenterController from '../controllers/center';
import EventController from '../controllers/event';
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
    Validation.trimBodyValues,
    Validation.checkBodyContains('username', 'password', 'email', 'fullname'),
    Validation.checkUsernameNotExists,
    Validation.checkEmailNotExists,
    UserController.createUser,
  );

// Login
router.route('/api/v1/users/login')
  .post(
    Validation.trimBodyValues,
    Validation.checkBodyContains('username', 'password'),
    Validation.checkUsernameExists,
    Validation.checkPasswordMatch,
    UserController.loginUser,
  );

// Add center
router.route('/api/v1/centers')
  .post(
    Validation.trimBodyValues,
    Validation.checkBodyContains('name', 'type', 'price', 'location'),
    authenticate,
    checkUserAdmin,
    EventCenterController.createCenter,
  );

// Modify center
router.route('/api/v1/centers/:centerId')
  .put(
    Validation.trimBodyValues,
    authenticate,
    checkUserAdmin,
    Validation.checkParamValid('centerId'),
    Validation.checkCenterIdParamExists,
    EventCenterController.modifyCenter,
  );

// Get all centers
router.route('/api/v1/centers')
  .get(
    authenticate,
    EventCenterController.getAllCenters,
  );

// Get a center and associated events
router.route('/api/v1/centers/:centerId')
  .get(
    authenticate,
    Validation.checkParamValid('centerId'),
    Validation.checkCenterIdParamExists,
    EventCenterController.getCenter,
  );

// Add event
router.route('/api/v1/events')
  .post(
    Validation.trimBodyValues,
    Validation.checkBodyContains('title', 'date', 'centerId'),
    authenticate,
    Validation.checkDateNotTaken,
    EventController.createEvent,
  );

// Modify event
router.route('/api/v1/events/:eventId')
  .put(
    Validation.trimBodyValues,
    authenticate,
    Validation.checkParamValid('eventId'),
    Validation.checkDateNotTaken,
    Validation.checkEventExists,
    EventController.modifyEvent,
  );

// Delete event
router.route('/api/v1/events/:eventId')
  .delete(
    authenticate,
    Validation.checkParamValid('eventId'),
    Validation.checkEventExists,
    EventController.deleteEvent,
  );

// 404 routes
router.route('*')
  .all((req, res) => {
    res.status(404).send({ message: 'This endpoint is not availaible' });
  });

export default router;
