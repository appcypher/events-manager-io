import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import ConnectedModifyCenterModal, { ModifyCenterModal } from '../../../client/src/components/ModifyCenterModal';
import mockStore from '../mocks/storeMock';
import { mockAxios } from '../mocks/axiosMock';

describe('ModifyCenterModal', () => {
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
    wrapper = shallow(<ConnectedModifyCenterModal store={store} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render connected component', () => {
    wrapper = mount(
      <Provider store={store}>
        <ConnectedModifyCenterModal modifyCenterModalState={{ id: 1 }} />
      </Provider>);
    expect(wrapper.length).toEqual(1);
  });

  it('should respond to change event and change the state of modal', () => {
    wrapper = mount(<ModifyCenterModal store={store} modifyCenterModalState={{ id: 1 }} />);
    wrapper.find('#modify-center-name').simulate('change', { target: { name: 'name', value: 'Ace' } });
    expect(wrapper.state('name')).toEqual('Ace');
  });

  it('should respond to change event and change the state of modal', () => {
    wrapper = mount(<ModifyCenterModal store={store} modifyCenterModalState={{ id: 1 }} />);
    wrapper.find('#modify-center-location').simulate('change', { target: { name: 'location', value: 'Lagos' } });
    expect(wrapper.state('location')).toEqual('Lagos');
  });
});
