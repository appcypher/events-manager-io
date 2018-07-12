import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ConnectedSignUpForm from '../../../client/src/components/SignUpForm';
import mockStore from '../mocks/storeMock';
import { mockAxios } from '../mocks/axiosMock';

describe('LoginForm', () => {
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
    wrapper = shallow(<ConnectedSignUpForm store={store} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render connected component', () => {
    wrapper = shallow(<ConnectedSignUpForm store={store} />);
    expect(wrapper.length).toEqual(1);
  });

  it('should call submit function when SignUpForm form is opened, filled, and submitted', () => {
    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ConnectedSignUpForm
            showLoader={() => {}}
            hideLoader={() => {}}
            showAlertModal={() => {}}
          />
        </Provider>
      </BrowserRouter>);

    const func1 = sinon.spy(wrapper.find('SignUpForm').instance(), 'submit');

    wrapper.find('input[name="username"]').simulate('change', { target: { value: 'Test' } });
    wrapper.find('input[name="password"]').simulate('change', { target: { value: 'Test' } });
    wrapper.find('#signup-button').simulate('click');

    expect(func1.called).toBeTruthy();
    sinon.reset();
  });
});
