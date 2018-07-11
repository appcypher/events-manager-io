import CenterAction from '../../../client/src/actions/centerActions';
import mockStore from '../mocks/storeMock';
import {
  mockAxios,
  getCentersResponse,
  postCentersResponse,
  putCentersResponse,
} from '../mocks/axiosMock';
import url from '../../../client/src/url';

describe('CenterAction', () => {
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

  it('should dispatch CENTER_GET_ALL_SUCCESSFUL action when centers are gotten', () =>
    store.dispatch(CenterAction.getAllCenters(token, 1))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: 'CENTER_GET_ALL_SUCCESSFUL', payload: getCentersResponse }]);
      }));

  it('should dispatch CENTER_CREATE_SUCCESSFUL action when center is created', () =>
    store.dispatch(CenterAction.createCenter(token, details, successFunc, failFunc))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: 'CENTER_CREATE_SUCCESSFUL', payload: postCentersResponse }]);
      }));

  it('should dispatch CENTER_CREATE_SUCCESSFUL action when image upload is successful and center is created', () =>
    store.dispatch(CenterAction.createCenter(token, { file: [''] }, successFunc, failFunc))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: 'CENTER_CREATE_SUCCESSFUL', payload: postCentersResponse }]);
      }));

  it('should dispatch CENTER_MODIFY_SUCCESSFUL action when center is modified', () =>
    store.dispatch(CenterAction.modifyCenter(token, details, 1, successFunc, failFunc))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: 'CENTER_MODIFY_SUCCESSFUL', payload: putCentersResponse }]);
      }));

  it('should dispatch CENTER_MODIFY_SUCCESSFUL action when image upload is successful and center is modified', () =>
    store.dispatch(CenterAction.modifyCenter(token, { file: [''] }, 1, successFunc, failFunc))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: 'CENTER_MODIFY_SUCCESSFUL', payload: putCentersResponse }]);
      }));

  // Fails
  it('should dispatch REQUEST_FAILED action when center is not created', () => {
    mock
      .onPost(`${url}/api/v1/centers`)
      .reply(404, {});

    return store.dispatch(CenterAction.createCenter(token, details, successFunc, failFunc))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: 'REQUEST_FAILED', payload: {} }]);
      });
  });

  it('should dispatch REQUEST_FAILED action when image upload is not successful', () => {
    mock
      .onPost(`${url}/api/v1/centers`)
      .reply(404, {})
      .onPost('https://api.cloudinary.com/v1_1/appcypher/upload')
      .reply(404, {});

    return store.dispatch(CenterAction.createCenter(token, { file: [''] }, successFunc, failFunc))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: 'REQUEST_FAILED', payload: {} }]);
      });
  });

  it('should dispatch REQUEST_FAILED action when image upload is successful but center creation not successful', () => {
    mock
      .onPost(`${url}/api/v1/centers`)
      .reply(404, {});

    return store.dispatch(CenterAction.createCenter(token, { file: [''] }, successFunc, failFunc))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: 'REQUEST_FAILED', payload: {} }]);
      });
  });

  it('should dispatch REQUEST_FAILED action when center modification not successful', () => {
    mock
      .onPut(`${url}/api/v1/centers/1`)
      .reply(404, {});

    return store.dispatch(CenterAction.modifyCenter(token, details, 1, successFunc, failFunc))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: 'REQUEST_FAILED', payload: {} }]);
      });
  });

  it('should dispatch REQUEST_FAILED action when image upload is not successful', () => {
    mock
      .onPut(`${url}/api/v1/centers/1`)
      .reply(404, {})
      .onPost('https://api.cloudinary.com/v1_1/appcypher/upload')
      .reply(404, {});

    return store.dispatch(CenterAction.modifyCenter(token, { file: [''] }, 1, successFunc, failFunc))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: 'REQUEST_FAILED', payload: {} }]);
      });
  });

  it('should dispatch REQUEST_FAILED action when image upload is successful but center modification not successful', () => {
    mock
      .onPut(`${url}/api/v1/centers/1`)
      .reply(404, {});

    return store.dispatch(CenterAction.modifyCenter(token, { file: [''] }, 1, successFunc, failFunc))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: 'REQUEST_FAILED', payload: {} }]);
      });
  });
});
