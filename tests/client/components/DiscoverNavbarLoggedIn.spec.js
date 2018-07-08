import React from 'react';
import { shallow } from 'enzyme';
import ConnectedDiscoverNavbarLoggedIn from '../../../client/src/components/DiscoverNavbarLoggedIn';
import mockStore from '../mocks/storeMock';
import { mockAxios } from '../mocks/axiosMock';

describe('DiscoverNavbarLoggedIn', () => {
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
    wrapper = shallow(<ConnectedDiscoverNavbarLoggedIn store={store} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render connected component', () => {
    wrapper = shallow(<ConnectedDiscoverNavbarLoggedIn store={store} />);
    expect(wrapper.length).toEqual(1);
  });
});
