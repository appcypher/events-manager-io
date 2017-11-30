const initial = {
  data: [],
  err: {
    response: null,
  },
};

export default (state = initial, { type, payload }) => {
  switch (type) {
    case 'USER_LOGIN_SUCCESSFUL': {
      return {
        ...state, data: payload,
      };
    }
    case 'USER_LOGIN_FAILED': {
      return {
        ...state, err: payload,
      };
    }
    default: return state;
  }
};
