import axios from 'axios';
import url from '../url';

class UserAction {
  /**
   * Creates a new user with and logs into account
   * @param{Object} details - user login details
   * @return{undefined}
   */
  static signupUser(details, successFunc, failFunc) {
    return (dispatch) => {
      axios({
        method: 'POST',
        url: `${url}/api/v1/users`,
        data: details,
      })
        .then((res) => {
          dispatch({ type: 'USER_SIGNUP_SUCCESSFUL', payload: res.data });
          successFunc();
        })
        .catch((err) => {
          if (err.response) {
            dispatch({ type: 'REQUEST_FAILED', payload: err.response.data });
            failFunc();
          }
        });
    };
  }

  /**
   * Logs in a user and gets a payload containing details about signed-in user
   * @param{Object} details - user login details
   * @return{undefined}
   */
  static loginUser(details, successFunc, failFunc) {
    return (dispatch) => {
      axios({
        method: 'POST',
        url: `${url}/api/v1/users/login`,
        data: details,
      })
        .then((res) => {
          dispatch({ type: 'USER_LOGIN_SUCCESSFUL', payload: res.data });
          successFunc();
        })
        .catch((err) => {
          if (err.response) {
            dispatch({ type: 'REQUEST_FAILED', payload: err.response.data });
            failFunc();
          }
        });
    };
  }

  /**
   * Gets the user's details and associated events
   * @param{Object} token - authentication token
   * @return{undefined}
   */
  static getUser(token, successFunc, failFunc) {
    return (dispatch) => {
      axios({
        method: 'POST',
        url: `${url}/api/v1/users`,
        headers: { token },
      })
        .then((res) => {
          dispatch({ type: 'USER_GET_DETAILS_SUCCESSFUL', payload: res.data });
          successFunc();
        })
        .catch((err) => {
          if (err.response) {
            dispatch({ type: 'REQUEST_FAILED', payload: err.response.data });
            failFunc();
          }
        });
    };
  }

  /**
   * Modify user's details
   * @param{Object} token - authentication token
   * @param{Object} details - user login details
   * @return{undefined}
   */
  static modifyUserProfile(token, details, successFunc, failFunc) {
    return (dispatch) => {
      axios({
        method: 'PUT',
        url: `${url}/api/v1/users`,
        headers: { token },
        data: details,
      })
        .then((res) => {
          dispatch({ type: 'USER_MODIFY_PROFILE_SUCCESSFUL', payload: res.data });
          successFunc();
        })
        .catch((err) => {
          if (err.response) {
            dispatch({ type: 'REQUEST_FAILED', payload: err.response.data });
            failFunc();
          }
        });
    };
  }

  /**
   * Logs out user
   * @param{Object} token - authentication token
   * @return{undefined}
   */
  static logoutUser(token, successFunc, failFunc) {
    return (dispatch) => {
      axios({
        method: 'POST',
        url: `${url}/api/v1/users/logout`,
        headers: { token },
      })
        .then((res) => {
          dispatch({ type: 'USER_LOGOUT_SUCCESSFUL', payload: res.data });
          successFunc();
        })
        .catch((err) => {
          if (err.response) {
            dispatch({ type: 'REQUEST_FAILED', payload: err.response.data });
            failFunc();
          }
        });
    };
  }

  static clearUserToken() {
    return (dispatch) => {
      dispatch({ type: 'USER_TOKEN_TO_BE_CLEARED', payload: null });
    };
  }
}

export default UserAction;
