import UserAction from '../../../client/src/actions/userActions';
import mockStore from '../mocks/storeMock';
import {
  mockAxios,
  postUsersResponse,
  postUsersLoginResponse,
  getUsersResponse,
} from '../mocks/axiosMock';
import url from '../../../client/src/url';

describe('UserAction', () => {
  const token = '';
  const details = {};
  const successFunc = () => {};
  const failFunc = () => {};

  let store;
  let mock = mockAxios();

  beforeEach(() => {
    mock = mockAxios();
    store = mockStore();
  });

  afterEach(() => {
    mock.reset();
  });

  it('should dispatch USER_SIGNUP_SUCCESSFUL action when user is signed up', () =>
    store.dispatch(UserAction.signupUser(details, successFunc, failFunc))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: 'USER_SIGNUP_SUCCESSFUL', payload: postUsersResponse }]);
      }));

  it('should dispatch REQUEST_FAILED action when user signup is not successful', () => {
    mock
      .onPost(`${url}/api/v1/users`)
      .reply(404, {});

    return store.dispatch(UserAction.signupUser(details, successFunc, failFunc))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: 'REQUEST_FAILED', payload: {} }]);
      });
  });

  it('should dispatch USER_MODIFY_PROFILE_SUCCESSFUL action when user details is modified in', () =>
    store.dispatch(UserAction.modifyUserProfile(token, details, successFunc, failFunc))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: 'USER_MODIFY_PROFILE_SUCCESSFUL', payload: postUsersResponse }]);
      }));

  it('should dispatch REQUEST_FAILED action when user details is not modified successfully', () => {
    mock
      .onPut(`${url}/api/v1/users`)
      .reply(404, {});

    return store.dispatch(UserAction.modifyUserProfile(token, details, successFunc, failFunc))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: 'REQUEST_FAILED', payload: {} }]);
      });
  });

  it('should dispatch USER_LOGIN_SUCCESSFUL action when user is logged in', () =>
    store.dispatch(UserAction.loginUser(details, successFunc, failFunc))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: 'USER_LOGIN_SUCCESSFUL', payload: postUsersLoginResponse }]);
      }));

  it('should dispatch REQUEST_FAILED action when user login is not successful', () => {
    mock
      .onPost(`${url}/api/v1/users/login`)
      .reply(404, {});

    return store.dispatch(UserAction.loginUser(details, successFunc, failFunc))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: 'REQUEST_FAILED', payload: {} }]);
      });
  });

  it('should dispatch USER_GET_DETAILS_SUCCESSFUL action when user details are gotten', () =>
    store.dispatch(UserAction.getUser(token, successFunc, failFunc))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: 'USER_GET_DETAILS_SUCCESSFUL', payload: getUsersResponse }]);
      }));

  it('should dispatch REQUEST_FAILED action when user details cannot be gotten', () => {
    mock
      .onGet(`${url}/api/v1/users`)
      .reply(404, {});

    return store.dispatch(UserAction.getUser(token, successFunc, failFunc))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: 'REQUEST_FAILED', payload: {} }]);
      });
  });
});
