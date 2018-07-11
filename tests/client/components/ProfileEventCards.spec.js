import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import ConnectedProfileEventCards from '../../../client/src/components/ProfileEventCards';
import mockStore from '../mocks/storeMock';
import { mockAxios } from '../mocks/axiosMock';

describe('ProfileEventCards', () => {
  let wrapper;
  let store;
  mockAxios();

  beforeAll(() => {
    store = mockStore();
    localStorage.setItem('user.token', 'token');
    localStorage.setItem('user.admin', 'true');
  });

  afterAll(() => {
    localStorage.setItem('user.token', 'undefined');
    localStorage.setItem('user.admin', 'undefined');
  });

  it('Should maintain existing snapshot', () => {
    wrapper = shallow(
      <Provider store={store}>
        <ConnectedProfileEventCards
          showModifyEventModal={() => {}}
          showConfirmModal={() => {}}
        />
      </Provider>);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render connected component', () => {
    wrapper = mount(
      <Provider store={store}>
        <ConnectedProfileEventCards
          showModifyEventModal={() => {}}
          showConfirmModal={() => {}}
        />
      </Provider>);
    expect(wrapper.length).toEqual(1);
  });
});
