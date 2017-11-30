import axios from 'axios';
import url from '../url';

class EventAction {
  /**
   * Creates a new event
   * @param{Object} token - authentication token
   * @param{Object} details - center details
   * @return{undefined}
   */
  static createEvent(token, details) {
    return (dispatch) => {
      dispatch({ type: 'REQUEST_MADE', payload: 'createEvent' });
      axios({
        method: 'POST',
        url: `${url}/api/v1/events`,
        headers: { token },
        data: details,
      })
        .then((res) => {
          dispatch({ type: 'EVENT_MODIFY_SUCCESSFUL', payload: res.data });
        })
        .catch((err) => {
          dispatch({ type: 'REQUEST_FAILED', payload: err.response.data });
        });
    };
  }

  /**
   * Modifies an existing event
   * @param{Object} token - authentication token
   * @param{Object} details - center details
   * @param{Number} param - event id
   * @return{undefined}
   * @return{json}
   */
  static modifyEvent(token, details, param) {
    return (dispatch) => {
      dispatch({ type: 'REQUEST_MADE', payload: 'modifyEvent' });
      axios({
        method: 'POST',
        url: `${url}/api/v1/events/${param}`,
        headers: { token },
        data: details,
      })
        .then((res) => {
          dispatch({ type: 'EVENT_MODIFY_SUCCESSFUL', payload: res.data });
        })
        .catch((err) => {
          dispatch({ type: 'REQUEST_FAILED', payload: err.response.data });
        });
    };
  }

  /**
   * Deletes a specific event
   * @param{Object} token - authentication token
   * @return{json}
   */
  static getAllEvents(token) {
    return (dispatch) => {
      dispatch({ type: 'REQUEST_MADE', payload: 'getAllEvents' });
      axios({
        method: 'POST',
        url: `${url}/api/v1/events`,
        headers: { token },
      })
        .then((res) => {
          dispatch({ type: 'EVENT_MODIFY_SUCCESSFUL', payload: res.data });
        })
        .catch((err) => {
          dispatch({ type: 'REQUEST_FAILED', payload: err.response.data });
        });
    };
  }

  /**
   * Gets details of all existing event
   * @param{Object} token - authentication token
   * @param{Number} param - event id
   * @return{json}
   */
  static deleteEvent(token, param) {
    return (dispatch) => {
      dispatch({ type: 'REQUEST_MADE', payload: 'deleteEvent' });
      axios({
        method: 'DELETE',
        url: `${url}/api/v1/events/${param}`,
        headers: { token },
      })
        .then((res) => {
          dispatch({ type: 'EVENT_DELETE_SUCCESSFUL', payload: res.data });
        })
        .catch((err) => {
          dispatch({ type: 'REQUEST_FAILED', payload: err.response.data });
        });
    };
  }
}

export default EventAction;
