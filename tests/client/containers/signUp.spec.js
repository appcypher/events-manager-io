import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import SignUp from '../../../client/src/containers/SignUp';
import mockStore from '../mocks/storeMock';
import { mockAxios } from '../mocks/axiosMock';

describe('<SignUp />', () => {
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


  beforeEach(() => {
    wrapper = shallow(<SignUp />);
  });

  it('should render dumb component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('Should maintain existing snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call submit function when SignUpForm form is opened, filled, and submitted', () => {
    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <SignUp />
        </Provider>
      </BrowserRouter>);

    const func1 = sinon.spy(wrapper.find('SignUpForm').instance(), 'submit');

    wrapper.find('input[name="username"]').simulate('change', { target: { value: 'Test' } });
    wrapper.find('input[name="password"]').simulate('change', { target: { value: 'Test' } });
    wrapper.find('SignUp').instance().hideLoader();
    wrapper.find('#signup-button').simulate('click');

    expect(func1.called).toBeTruthy();
    sinon.reset();
  });
});
