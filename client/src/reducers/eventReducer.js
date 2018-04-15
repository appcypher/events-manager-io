const initial = {
  message: '', events: [],
};

export default (state = initial, { type, payload }) => {
  switch (type) {
    case 'EVENTS_GET_ALL_SUCCESSFUL': {
      const { message, events } = payload;
      return {
        ...state, message, events,
      };
    }
    case 'CLEAR_ALL_DATA': {
      return {
        ...state, message: '', events: [],
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
