const initial = {
  message: '', token: '', user: {},
};

/**
 * Returns a state containing a message and (possibly) a user property
 * @param{Object} state - previous state
 * @param{Object} action - action containing a type and payload property
 * @return{Object} new state
 */
export default (state = initial, { type, payload }) => {
  switch (type) {
    case 'USER_SIGNUP_SUCCESSFUL': {
      const { message, token } = payload;
      return {
        ...state, message, token,
      };
    }
    case 'USER_LOGIN_SUCCESSFUL': {
      const { message, token } = payload;
      return {
        ...state, message, token,
      };
    }
    case 'USER_GET_DETAILS_SUCCESSFUL': {
      const { message, user } = payload;
      return {
        ...state, message, user,
      };
    }
    case 'CLEAR_ALL_DATA': {
      return {
        ...state, message: '', token: '', user: {},
      };
    }
    case 'REQUEST_FAILED': {
      const { message } = payload;
      return {
        ...state, message,
      };
    }
    default: return state;
  }
};
