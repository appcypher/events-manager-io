import React from 'react';
import { shallow } from 'enzyme';
import ConnectedHomeNavbarLoggedIn from '../../../client/src/components/HomeNavbarLoggedIn';
import mockStore from '../mocks/storeMock';
import { mockAxios } from '../mocks/axiosMock';

describe('HomeNavbarLoggedIn', () => {
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
    wrapper = shallow(<ConnectedHomeNavbarLoggedIn store={store} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render connected component', () => {
    wrapper = shallow(<ConnectedHomeNavbarLoggedIn store={store} />);
    expect(wrapper.length).toEqual(1);
  });
});
