import userReducer from '../../../client/src/reducers/userReducer';

describe('UserReducer', () => {
  const initialState = { message: '', token: '', user: {} };
  const payload = { message: '', token: 'new', user: { } };

  it('should have initial state', () => {
    expect(userReducer(initialState, { })).toEqual(initialState);
  });

  it('should handle USER_SIGNUP_SUCCESSFUL', () => {
    expect(userReducer(
      initialState,
      { type: 'USER_SIGNUP_SUCCESSFUL', payload },
    ).token).toEqual('new');
  });

  it('should handle USER_LOGIN_SUCCESSFUL', () => {
    expect(userReducer(
      initialState,
      { type: 'USER_LOGIN_SUCCESSFUL', payload },
    ).token).toEqual('new');
  });

  it('should handle USER_GET_DETAILS_SUCCESSFUL', () => {
    expect(userReducer(
      initialState,
      { type: 'USER_GET_DETAILS_SUCCESSFUL', payload },
    ).token).toEqual('');
  });

  it('should handle CLEAR_ALL_DATA', () => {
    expect(userReducer(
      initialState,
      { type: 'CLEAR_ALL_DATA', payload },
    ).token).toEqual('');
  });
});
