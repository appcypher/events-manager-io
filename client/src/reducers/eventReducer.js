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
    case 'EVENT_MODIFY_SUCCESSFUL': {
      const { message } = payload;
      return {
        ...state, message,
      };
    }
    case 'EVENT_CREATE_SUCCESSFUL': {
      const { message } = payload;
      return {
        ...state, message,
      };
    }
    case 'EVENT_DELETE_SUCCESSFUL': {
      const { message } = payload;
      return {
        ...state, message,
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
