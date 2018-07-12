import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ConnectedLoginForm from '../../../client/src/components/LoginForm';
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
    wrapper = shallow(<ConnectedLoginForm store={store} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render connected component', () => {
    wrapper = shallow(<ConnectedLoginForm store={store} />);
    expect(wrapper.length).toEqual(1);
  });

  it('should call submit function when LoginForm form is opened, filled, and submitted', () => {
    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ConnectedLoginForm
            showLoader={() => {}}
            hideLoader={() => {}}
            showAlertModal={() => {}}
          />
        </Provider>
      </BrowserRouter>);

    const func1 = sinon.spy(wrapper.find('LoginForm').instance(), 'submit');

    wrapper.find('input[name="username"]').simulate('change', { target: { value: 'Test' } });
    wrapper.find('input[name="password"]').simulate('change', { target: { value: 'Test' } });
    wrapper.find('#login-button').simulate('click');

    expect(func1.called).toBeTruthy();
    sinon.reset();
  });
});
