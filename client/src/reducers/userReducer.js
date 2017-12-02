const initial = {
  message: '', token: '',
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
    case 'USER_SIGNUP_FAILED': {
      const { message } = payload;
      return {
        ...state, message,
      };
    }
    case 'USER_LOGIN_SUCCESSFUL': {
      const { message, token } = payload;
      return {
        ...state, message, token,
      };
    }
    case 'USER_LOGIN_FAILED': {
      const { message } = payload;
      return {
        ...state, message,
      };
    }
    default: return state;
  }
};
