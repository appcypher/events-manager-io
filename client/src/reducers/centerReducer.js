const initial = {
  message: '', centers: [],
};

export default (state = initial, { type, payload }) => {
  switch (type) {
    case 'CENTER_GET_SUCCESSFUL': {
      const { message, center } = payload;
      return {
        ...state, message, centers: [center],
      };
    }
    case 'CENTER_GET_ALL_SUCCESSFUL': {
      const { message, centers } = payload;
      return {
        ...state, message, centers,
      };
    }
    case 'CENTER_CREATE_SUCCESSFUL': {
      const { message } = payload;
      return {
        ...state, message,
      };
    }
    case 'CENTER_MODIFY_SUCCESSFUL': {
      const { message } = payload;
      return {
        ...state, message,
      };
    }
    case 'CLEAR_ALL_DATA': {
      return {
        ...state, message: '', centers: [],
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
