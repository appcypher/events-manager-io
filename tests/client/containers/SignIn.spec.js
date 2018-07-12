import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import SignIn from '../../../client/src/containers/SignIn';
import mockStore from '../mocks/storeMock';
import { mockAxios } from '../mocks/axiosMock';

describe('<SignIn />', () => {
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

  it('should render dumb component', () => {
    wrapper = shallow(<SignIn />);
    expect(wrapper.length).toEqual(1);
  });

  it('should maintain existing snapshot', () => {
    wrapper = shallow(<SignIn />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call submit function when AddCenterModal form is opened, filled, and submitted', () => {
    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <SignIn />
        </Provider>
      </BrowserRouter>);

    const func1 = sinon.spy(wrapper.find('LoginForm').instance(), 'submit');

    wrapper.find('input[name="username"]').simulate('change', { target: { value: 'Test' } });
    wrapper.find('input[name="password"]').simulate('change', { target: { value: 'Test' } });
    wrapper.find('SignIn').instance().hideLoader();
    wrapper.find('#login-button').simulate('click');

    expect(func1.called).toBeTruthy();
    sinon.reset();
  });
});
