import axios from 'axios';
import url from '../url';

class CenterAction {
  /**
   * Creates a new center
   * @param{Object} token - authentication token
   * @param{Object} details - center details
   * @return{undefined}
   */
  static createCenter(token, details) {
    return (dispatch) => {
      axios({
        method: 'POST',
        url: `${url}/api/v1/centers`,
        headers: { token },
        data: details,
      })
        .then((res) => {
          dispatch({ type: 'CENTER_CREATE_SUCCESSFUL', payload: res.data });
        })
        .catch((err) => {
          if (err.response) {
            dispatch({ type: 'REQUEST_FAILED', payload: err.response.data });
          }
        });
    };
  }

  /**
   * Modifies an existing center
   * @param{Object} token - authentication token
   * @param{Object} details - center details
   * @param{Number} param - center id
   * @return{undefined}
   */
  static modifyCenter(token, details, param) {
    return (dispatch) => {
      axios({
        method: 'PUT',
        url: `${url}/api/v1/centers/${param}`,
        headers: { token },
        data: details,
      })
        .then((res) => {
          dispatch({ type: 'CENTER_MODIFY_SUCCESSFUL', payload: res.data });
        })
        .catch((err) => {
          if (err.response) {
            dispatch({ type: 'REQUEST_FAILED', payload: err.response.data });
          }
        });
    };
  }

  /**
   * Get all centers
   * @param{Object} token - authentication token
   * @return{undefined}
   */
  static getAllCenters(token) {
    return (dispatch) => {
      axios({
        method: 'GET',
        url: `${url}/api/v1/centers`,
        headers: { token },
      })
        .then((res) => {
          dispatch({ type: 'CENTER_GET_ALL_SUCCESSFUL', payload: res.data });
        })
        .catch((err) => {
          if (err.response) {
            dispatch({ type: 'REQUEST_FAILED', payload: err.response.data });
          }
        });
    };
  }

  /**
   * Get a center's details, associated events and facility
   * @param{Object} token - authentication token
   * @param{Number} param - center id
   * @return{undefined}
   */
  static getCenter(token, param) {
    return (dispatch) => {
      axios({
        method: 'GET',
        url: `${url}/api/v1/centers/${param}`,
        headers: { token },
      })
        .then((res) => {
          dispatch({ type: 'CENTER_GET_SUCCESSFUL', payload: res.data });
        })
        .catch((err) => {
          if (err.response) {
            dispatch({ type: 'REQUEST_FAILED', payload: err.response.data });
          }
        });
    };
  }
}

export default CenterAction;
