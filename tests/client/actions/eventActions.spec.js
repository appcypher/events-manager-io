import EventAction from '../../../client/src/actions/eventActions';
import mockStore from '../mocks/storeMock';
import {
  mockAxios,
  postEventsResponse,
  putEventsResponse,
  deleteEventsResponse,
} from '../mocks/axiosMock';
import url from '../../../client/src/url';

describe('EventAction', () => {
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

  it('should dispatch EVENT_CREATE_SUCCESSFUL action when event is created', () =>
    store.dispatch(EventAction.createEvent(token, details, successFunc, failFunc))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: 'EVENT_CREATE_SUCCESSFUL', payload: postEventsResponse }]);
      }));

  it('should dispatch REQUEST_FAILED action when event creation not successful', () => {
    mock
      .onPost(`${url}/api/v1/events`)
      .reply(404, {});

    return store.dispatch(EventAction.createEvent(token, details, successFunc, failFunc))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: 'REQUEST_FAILED', payload: {} }]);
      });
  });

  it('should dispatch EVENT_MODIFY_SUCCESSFUL action when event is modified', () =>
    store.dispatch(EventAction.modifyEvent(token, details, 1, successFunc, failFunc))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: 'EVENT_MODIFY_SUCCESSFUL', payload: putEventsResponse }]);
      }));

  it('should dispatch REQUEST_FAILED action when event modification not successful', () => {
    mock
      .onPut(`${url}/api/v1/events/1`)
      .reply(404, {});

    return store.dispatch(EventAction.modifyEvent(token, details, 1, successFunc, failFunc))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: 'REQUEST_FAILED', payload: {} }]);
      });
  });

  it('should dispatch EVENT_DELETE_SUCCESSFUL action when event are deleted', () =>
    store.dispatch(EventAction.deleteEvent(token, 1, successFunc, failFunc))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: 'EVENT_DELETE_SUCCESSFUL', payload: deleteEventsResponse }]);
      }));

  it('should dispatch REQUEST_FAILED action when event deletion not successful', () => {
    mock
      .onDelete(`${url}/api/v1/events/1`)
      .reply(404, {});

    return store.dispatch(EventAction.deleteEvent(token, 1, successFunc, failFunc))
      .then(() => {
        expect(store.getActions()).toEqual([{ type: 'REQUEST_FAILED', payload: {} }]);
      });
  });
});
