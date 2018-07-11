import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import ConnectedProfileNavbar from '../../../client/src/components/ProfileNavbar';
import mockStore from '../mocks/storeMock';
import { mockAxios } from '../mocks/axiosMock';

describe('ProfileNavbar', () => {
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
    wrapper = shallow(<BrowserRouter><ConnectedProfileNavbar store={store} /></BrowserRouter>);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render connected component', () => {
    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ConnectedProfileNavbar />
        </Provider>
      </BrowserRouter>);
    expect(wrapper.length).toEqual(1);
  });
});
