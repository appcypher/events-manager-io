import axios from 'axios';
import url from '../url';

class UserAction {
  /**
   * Creates a new user with and logs into account
   * @param{Object} details - user login details
   * @return{undefined}
   */
  static createUser(details) {
    return (dispatch) => {
      dispatch({ type: 'REQUEST_MADE', payload: 'loginUser' });
      axios({
        method: 'POST',
        url: `${url}/api/v1/users`,
        data: details,
      })
        .then((res) => {
          dispatch({ type: 'USER_SIGNUP_SUCCESSFUL', payload: res.data });
        })
        .catch((err) => {
          dispatch({ type: 'REQUEST_FAILED', payload: err.response.data });
        });
    };
  }

  /**
   * Logs in a user and gets a payload containing details about signed-in user
   * @param{Object} details - user login details
   * @return{undefined}
   */
  static loginUser(details) {
    return (dispatch) => {
      dispatch({ type: 'REQUEST_MADE', payload: 'loginUser' });
      axios({
        method: 'POST',
        url: `${url}/api/v1/users/login`,
        data: details,
      })
        .then((res) => {
          dispatch({ type: 'USER_LOGIN_SUCCESSFUL', payload: res.data });
          console.log('>>>>>>>>'); // DEBUG
          console.log(res.data); // DEBUG
          console.log('<<<<<<<<'); // DEBUG
        })
        .catch((err) => {
          dispatch({ type: 'REQUEST_FAILED', payload: err.response.data });
          console.log('>>>>>>>>'); // DEBUG
          console.log(err.response.data); // DEBUG
          console.log('<<<<<<<<'); // DEBUG
        });
    };
  }

  /**
   * Gets the user's details and associated events
   * @param{Object} token - authentication token
   * @return{undefined}
   */
  static getUser(token) {
    return (dispatch) => {
      dispatch({ type: 'REQUEST_MADE', payload: 'getUser' });
      axios({
        method: 'POST',
        url: `${url}/api/v1/users`,
        headers: { token },
      })
        .then((res) => {
          dispatch({ type: 'USER_GET_DETAILS_SUCCESSFUL', payload: res.data });
          console.log(res.data); // DEBUG
        })
        .catch((err) => {
          dispatch({ type: 'REQUEST_FAILED', payload: err.response.data });
          console.log(err.response.data); // DEBUG
        });
    };
  }

  /**
   * Modify user's details
   * @param{Object} token - authentication token
   * @param{Object} details - user login details
   * @return{undefined}
   */
  static modifyUserProfile(token, details) {
    return (dispatch) => {
      dispatch({ type: 'REQUEST_MADE', payload: 'modifyUserProfile' });
      axios({
        method: 'PUT',
        url: `${url}/api/v1/users`,
        headers: { token },
        data: details,
      })
        .then((res) => {
          dispatch({ type: 'USER_MODIFY_PROFILE_SUCCESSFUL', payload: res.data });
          console.log(res.data); // DEBUG
        })
        .catch((err) => {
          dispatch({ type: 'REQUEST_FAILED', payload: err.response.data });
          console.log(err.response.data); // DEBUG
        });
    };
  }

  /**
   * Logs out user
   * @param{Object} token - authentication token
   * @return{undefined}
   */
  static logoutUser(token) {
    return (dispatch) => {
      dispatch({ type: 'REQUEST_MADE', payload: 'modifyUserProfile' });
      axios({
        method: 'POST',
        url: `${url}/api/v1/users/logout`,
        headers: { token },
      })
        .then((res) => {
          dispatch({ type: 'USER_LOGOUT_SUCCESSFUL', payload: res.data });
          console.log(res.data); // DEBUG
        })
        .catch((err) => {
          dispatch({ type: 'REQUEST_FAILED', payload: err.response.data });
          console.log(err.response.data); // DEBUG
        });
    };
  }
}

export default UserAction;
