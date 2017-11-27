import express from 'express';
import path from 'path';
import authenticate from '../middleware/authentication';
import checkUserAdmin from '../middleware/authorization';
import UserController from '../controllers/user';
import EventCenterController from '../controllers/center';
import EventController from '../controllers/event';
import FacilityController from '../controllers/facility';
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
    EventCenterController.getCenter,
  );

// Add event
router.route('/api/v1/events')
  .post(
    Validation.trimBodyValues,
    Validation.checkBodyContains('title', 'date', 'centerId'),
    authenticate,
    Validation.checkDateValid,
    Validation.checkDateNotTaken,
    Validation.checkAssociatedCenterExists,
    EventController.createEvent,
  );

// Modify event
router.route('/api/v1/events/:eventId')
  .put(
    Validation.trimBodyValues,
    authenticate,
    Validation.checkParamValid('eventId'),
    Validation.checkDateValid,
    Validation.checkDateNotTaken,
    Validation.checkAssociatedCenterExists,
    Validation.checkUserOwnEvent,
    EventController.modifyEvent,
  );

// Delete event
router.route('/api/v1/events/:eventId')
  .delete(
    authenticate,
    Validation.checkParamValid('eventId'),
    Validation.checkUserOwnEvent,
    EventController.deleteEvent,
  );

/* Additional Routes */
// Get user's details
router.route('/api/v1/users')
  .get(
    authenticate,
    UserController.getUser,
  );

// Modify user's profile
router.route('/api/v1/users')
  .put(
    authenticate,
    Validation.trimBodyValues,
    UserController.modifyUserProfile,
  );

// Log user out
router.route('/api/v1/users/logout')
  .get(
    authenticate,
    UserController.logoutUser,
  );

// Get all events
router.route('/api/v1/events')
  .get(
    authenticate,
    EventController.getAllEvents,
  );

// Add new facility
router.route('/api/v1/facilities')
  .post(
    Validation.trimBodyValues,
    Validation.checkBodyContains('centerId'),
    authenticate,
    checkUserAdmin,
    Validation.checkAssociatedCenterExists,
    FacilityController.createFacility,
  );

// Modify facility
router.route('/api/v1/facilities/:facilityId')
  .put(
    Validation.trimBodyValues,
    authenticate,
    checkUserAdmin,
    Validation.checkParamValid('facilityId'),
    Validation.checkAssociatedCenterExists,
    FacilityController.modifyFacility,
  );

// 404 routes
router.route('*')
  .all((req, res) => {
    res.status(404).send({ message: 'This endpoint is not availaible' });
  });

export default router;
