import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import ConnectedViewCenterModal from '../../../client/src/components/ViewCenterModal';
import mockStore from '../mocks/storeMock';
import { mockAxios } from '../mocks/axiosMock';

describe('ViewCenterModal', () => {
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
    wrapper = shallow(<ConnectedViewCenterModal store={store} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render connected component', () => {
    wrapper = shallow(<ConnectedViewCenterModal store={store} />);
    expect(wrapper.length).toEqual(1);
  });

  it('should render modify button if user is admin', () => {
    localStorage.setItem('user.admin', 'true');

    const viewCenterModalState = {
      picture1: '',
      name: '',
      type: '',
      location: '',
      available: '',
      price: '',
      events: [{
        date: '2018-07-10T23:54:27.184Z',
      }],
    };

    wrapper = mount(
      <Provider store={store}>
        <ConnectedViewCenterModal
          hideViewCenterModal={() => {}}
          showModifyCenterModal={() => {}}
          viewCenterModalState={viewCenterModalState}
        />
      </Provider>);

    expect(wrapper.find('#modify-center').exists()).toBeTruthy();
  });

  it('should not render modify button if user is admin', () => {
    localStorage.setItem('user.admin', 'false');

    const viewCenterModalState = {
      picture1: '',
      name: '',
      type: '',
      location: '',
      available: '',
      price: '',
      events: [{
        date: '2018-07-10T23:54:27.184Z',
      }],
    };

    wrapper = mount(
      <Provider store={store}>
        <ConnectedViewCenterModal
          hideViewCenterModal={() => {}}
          showModifyCenterModal={() => {}}
          viewCenterModalState={viewCenterModalState}
        />
      </Provider>);

    expect(wrapper.find('#modify-center').exists()).toBeFalsy();
  });
});
