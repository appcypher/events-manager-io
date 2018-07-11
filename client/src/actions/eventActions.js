import axios from 'axios';
import url from '../url';

class EventAction {
  /**
   * Creates a new event
   * @param{Object} token - authentication token
   * @param{Object} details - center details
   * @return{undefined}
   */
  static createEvent(token, details, successFunc, failFunc) {
    return dispatch =>
      axios({
        method: 'POST',
        url: `${url}/api/v1/events`,
        headers: { token },
        data: details,
      })
        .then((res) => {
          dispatch({ type: 'EVENT_CREATE_SUCCESSFUL', payload: res.data });
          if (successFunc) successFunc();
        })
        .catch((err) => {
          if (err.response) {
            dispatch({ type: 'REQUEST_FAILED', payload: err.response.data });
            if (failFunc) failFunc();
          }
        });
  }

  /**
   * Modifies an existing event
   * @param{Object} token - authentication token
   * @param{Object} details - center details
   * @param{Number} param - event id
   * @return{undefined}
   * @return{json}
   */
  static modifyEvent(token, details, param, successFunc, failFunc) {
    return dispatch =>
      axios({
        method: 'PUT',
        url: `${url}/api/v1/events/${param}`,
        headers: { token },
        data: details,
      })
        .then((res) => {
          dispatch({ type: 'EVENT_MODIFY_SUCCESSFUL', payload: res.data });
          if (successFunc) successFunc();
        })
        .catch((err) => {
          if (err.response) {
            dispatch({ type: 'REQUEST_FAILED', payload: err.response.data });
            if (failFunc) failFunc();
          }
        });
  }

  /**
   * Deletes a specific event
   * @param{Object} token - authentication token
   * @return{json}
   */
  static getAllEvents(token, pageNumber) {
    return dispatch =>
      axios({
        method: 'GET',
        url: `${url}/api/v1/events?page=${pageNumber}`,
        headers: { token },
      })
        .then((res) => {
          dispatch({ type: 'EVENTS_GET_ALL_SUCCESSFUL', payload: res.data });
        })
        .catch((err) => {
          dispatch({ type: 'REQUEST_FAILED', payload: err.response.data });
        });
  }

  /**
   * Gets details of all existing event
   * @param{Object} token - authentication token
   * @param{Number} param - event id
   * @return{json}
   */
  static deleteEvent(token, param, successFunc, failFunc) {
    return dispatch =>
      axios({
        method: 'DELETE',
        url: `${url}/api/v1/events/${param}`,
        headers: { token },
      })
        .then((res) => {
          dispatch({ type: 'EVENT_DELETE_SUCCESSFUL', payload: res.data });
          if (successFunc) successFunc();
        })
        .catch((err) => {
          if (err.response) {
            dispatch({ type: 'REQUEST_FAILED', payload: err.response.data });
            if (failFunc) failFunc();
          }
        });
  }
}

export default EventAction;
