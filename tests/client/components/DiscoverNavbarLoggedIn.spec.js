import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
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

  it('should maintain existing snapshot', () => {
    wrapper = shallow(<ConnectedDiscoverNavbarLoggedIn store={store} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render connected component', () => {
    wrapper = shallow(<ConnectedDiscoverNavbarLoggedIn store={store} />);
    expect(wrapper.length).toEqual(1);
  });

  it('should call logoutUser function when `log out` button is clicked', () => {
    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ConnectedDiscoverNavbarLoggedIn
            history={{ push: () => {} }}
          />
        </Provider>
      </BrowserRouter>);

    const func = sinon.spy(wrapper.find('DiscoverNavbarLoggedIn').instance(), 'logoutUser');

    wrapper.find('#discover-navbar-logout').simulate('click');
    wrapper.find('DiscoverNavbarLoggedIn').instance().logoutUser();
    expect(func.called).toBeTruthy();
    sinon.reset();
  });
});
