import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import ConnectedAddCenterModal, { AddCenterModal } from '../../../client/src/components/AddCenterModal';
import mockStore from '../mocks/storeMock';
import { mockAxios } from '../mocks/axiosMock';

describe('AddCenterModal', () => {
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
    wrapper = shallow(<ConnectedAddCenterModal store={store} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render connected component', () => {
    wrapper = mount(<Provider store={store}><ConnectedAddCenterModal /></Provider>);
    expect(wrapper.length).toEqual(1);
  });

  it('should respond to change event and change the state of modal', () => {
    wrapper = mount(<AddCenterModal store={store} />);
    wrapper.find('#add-center-name').simulate('change', { target: { name: 'name', value: 'Ace' } });
    expect(wrapper.state('name')).toEqual('Ace');
  });
});
