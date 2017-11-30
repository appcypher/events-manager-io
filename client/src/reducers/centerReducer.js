const initial = {
  data: [],
  err: {
    response: null,
  },
};

export default (state = initial, { type, payload }) => {
  switch (type) {
    case 'SINGLE_CENTER_FETCH_SUCCESSFUL': {
      const [center] = payload.centers;
      return {
        ...state, center,
      };
    }
    case 'SINGLE_CENTER_FETCH_FAILED': {
      const { err } = payload;
      return {
        ...state, err,
      };
    }
    case 'ALL_CENTERS_FETCH_SUCCESSFUL': {
      const { centers } = payload;
      return {
        ...state, centers,
      };
    }
    case 'ALL_CENTERS_FETCH_FAILED': {
      const { err } = payload;
      return {
        ...state, err,
      };
    }
    default: return state;
  }
};
