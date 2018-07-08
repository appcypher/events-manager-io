import eventReducer from '../../../client/src/reducers/eventReducer';

describe('EventReducer', () => {
  const initialState = { message: '', events: [] };
  const payload = { message: '', events: [{}] };

  it('should have initial state', () => {
    expect(eventReducer(initialState, { })).toEqual(initialState);
  });

  it('should handle EVENTS_GET_ALL_SUCCESSFUL', () => {
    expect(eventReducer(
      initialState,
      { type: 'EVENTS_GET_ALL_SUCCESSFUL', payload },
    ).events.length).toEqual(1);
  });

  it('should handle EVENT_MODIFY_SUCCESSFUL', () => {
    expect(eventReducer(
      initialState,
      { type: 'EVENT_MODIFY_SUCCESSFUL', payload },
    ).events.length).toEqual(0);
  });

  it('should handle EVENT_CREATE_SUCCESSFUL', () => {
    expect(eventReducer(
      initialState,
      { type: 'EVENT_CREATE_SUCCESSFUL', payload },
    ).events.length).toEqual(0);
  });

  it('should handle EVENT_DELETE_SUCCESSFUL', () => {
    expect(eventReducer(
      initialState,
      { type: 'EVENT_DELETE_SUCCESSFUL', payload },
    ).events.length).toEqual(0);
  });

  it('should handle CLEAR_ALL_DATA', () => {
    expect(eventReducer(
      initialState,
      { type: 'CLEAR_ALL_DATA', payload },
    ).events.length).toEqual(0);
  });
});
