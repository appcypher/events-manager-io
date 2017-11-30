const initial = {
  data: [],
  err: {
    response: null,
  },
};

export default (state = initial, { type, payload }) => {
  switch (type) {
    case 'ALL_EVENTS_FETCH_SUCCESSFUL': {
      const { centers } = payload;
      return {
        ...state, centers,
      };
    }
    case 'ALL_EVENTS_FETCH_FAILED': {
      const { err } = payload;
      return {
        ...state, err,
      };
    }
    default: return state;
  }
};
