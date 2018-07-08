import centerReducer from '../../../client/src/reducers/centerReducer';

describe('CenterReducer', () => {
  const initialState = { message: '', centers: [] };
  const payload = { message: '', centers: [{}] };

  it('should have initial state', () => {
    expect(centerReducer(initialState, { })).toEqual(initialState);
  });

  it('should handle CENTER_GET_SUCCESSFUL', () => {
    expect(centerReducer(
      initialState,
      { type: 'CENTER_GET_SUCCESSFUL', payload },
    ).centers.length).toEqual(1);
  });

  it('should handle CENTER_GET_ALL_SUCCESSFUL', () => {
    expect(centerReducer(
      initialState,
      { type: 'CENTER_GET_ALL_SUCCESSFUL', payload },
    ).centers.length).toEqual(1);
  });

  it('should handle CENTER_CREATE_SUCCESSFUL', () => {
    expect(centerReducer(
      initialState,
      { type: 'CENTER_CREATE_SUCCESSFUL', payload },
    ).centers.length).toEqual(0);
  });

  it('should handle CENTER_MODIFY_SUCCESSFUL', () => {
    expect(centerReducer(
      initialState,
      { type: 'CENTER_MODIFY_SUCCESSFUL', payload },
    ).centers.length).toEqual(0);
  });

  it('should handle CLEAR_ALL_DATA', () => {
    expect(centerReducer(
      initialState,
      { type: 'CLEAR_ALL_DATA', payload },
    ).centers.length).toEqual(0);
  });
});
