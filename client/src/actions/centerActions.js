import axios from 'axios';
import url from '../url';

class CenterAction {
  static cloudinaryUrl = 'https://api.cloudinary.com/v1_1/appcypher/upload';
  static cloudinaryUploadPreset = 'knlmha0j';

  /**
   * Upload image
   * @param{Object} details - center details
   * @return{Promise}
   */
  static uploadImage(details) {
    // Upload image first.
    const formData = new FormData();
    formData.append('file', details.file);
    formData.append('upload_preset', CenterAction.cloudinaryUploadPreset);

    return axios({
      method: 'POST',
      url: CenterAction.cloudinaryUrl,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: formData,
    });
  }

  /**
   * Creates a new center
   * @param{Object} token - authentication token
   * @param{Object} details - center details
   * @return{undefined}
   */
  static createCenter(token, details, successFunc, failFunc) {
    return (dispatch) => {
      // If user chooses an image.
      if (details.file && details.file !== []) {
        // Upload image
        return CenterAction.uploadImage(details)
          .then(res =>
            // Make request for creating new center.
            axios({
              method: 'POST',
              url: `${url}/api/v1/centers`,
              headers: { token },
              data: { ...details, picture1: res.data.secure_url },
            })
              .then((resp) => {
                dispatch({ type: 'CENTER_CREATE_SUCCESSFUL', payload: resp.data });
                if (successFunc) successFunc();
              })
              .catch((err) => {
                if (err.response) {
                  dispatch({ type: 'REQUEST_FAILED', payload: err.response.data });
                  if (failFunc) failFunc();
                }
              }))
          .catch((err) => {
            if (err.response) {
              dispatch({ type: 'REQUEST_FAILED', payload: err.response.data });
              if (failFunc) failFunc();
            }
          });
      }
      // Make request for creating new center.
      return axios({
        method: 'POST',
        url: `${url}/api/v1/centers`,
        headers: { token },
        data: { ...details },
      })
        .then((resp) => {
          dispatch({ type: 'CENTER_CREATE_SUCCESSFUL', payload: resp.data });
          if (successFunc) successFunc();
        })
        .catch((err) => {
          if (err.response) {
            dispatch({ type: 'REQUEST_FAILED', payload: err.response.data });
          }
          if (failFunc) failFunc();
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
  static modifyCenter(token, details, param, successFunc, failFunc) {
    return (dispatch) => {
      // If user chooses an image.
      if (details.file && details.file !== []) {
        // Upload image
        return CenterAction.uploadImage(details)
          .then(res =>
            // Make request for modifying center.
            axios({
              method: 'PUT',
              url: `${url}/api/v1/centers/${param}`,
              headers: { token },
              data: { ...details, picture1: res.data.secure_url },
            })
              .then((resp) => {
                dispatch({ type: 'CENTER_MODIFY_SUCCESSFUL', payload: resp.data });
                if (successFunc) successFunc();
              })
              .catch((err) => {
                if (err.response) {
                  dispatch({ type: 'REQUEST_FAILED', payload: err.response.data });
                  if (failFunc) failFunc();
                }
              }))
          .catch((err) => {
            if (err.response) {
              dispatch({ type: 'REQUEST_FAILED', payload: err.response.data });
              if (failFunc) failFunc();
            }
          });
      }

      // Make request for modifying center.
      return axios({
        method: 'PUT',
        url: `${url}/api/v1/centers/${param}`,
        headers: { token },
        data: { ...details },
      })
        .then((res) => {
          dispatch({ type: 'CENTER_MODIFY_SUCCESSFUL', payload: res.data });
          if (successFunc) successFunc();
        })
        .catch((err) => {
          if (err.response) {
            dispatch({ type: 'REQUEST_FAILED', payload: err.response.data });
            if (failFunc) failFunc();
          }
        });
    };
  }

  /**
   * Get all centers
   * @param{Object} token - authentication token
   * @return{undefined}
   */
  static getAllCenters(token, pageNumber) {
    return dispatch =>
      axios({
        method: 'GET',
        url: `${url}/api/v1/centers?page=${pageNumber}`,
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
  }

  /**
   * Get a center's details, associated events and facility
   * @param{Object} token - authentication token
   * @param{Number} param - center id
   * @return{undefined}
   */
  static getCenter(token, param) {
    return dispatch =>
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
  }
}

export default CenterAction;
