import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import ConnectedModifyEventModal, { ModifyEventModal } from '../../../client/src/components/ModifyEventModal';
import mockStore from '../mocks/storeMock';
import { mockAxios } from '../mocks/axiosMock';

describe('ModifyEventModal', () => {
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
    wrapper = shallow(<ConnectedModifyEventModal store={store} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render connected component', () => {
    wrapper = mount(
      <Provider store={store}>
        <ConnectedModifyEventModal modifyEventModalState={{ id: 1 }} />
      </Provider>);
    expect(wrapper.length).toEqual(1);
  });

  it('should respond to change event and change the state of modal', () => {
    wrapper = mount(<ModifyEventModal store={store} modifyEventModalState={{ id: 1 }} />);
    wrapper.find('#modify-event-title').simulate('change', { target: { name: 'title', value: 'Party' } });
    expect(wrapper.state('title')).toEqual('Party');
  });

  it('should respond to change event and change the state of modal', () => {
    wrapper = mount(<ModifyEventModal store={store} modifyEventModalState={{ id: 1 }} />);
    wrapper.find('#modify-event-description').simulate('change', { target: { name: 'description', value: 'It will be nice' } });
    expect(wrapper.state('description')).toEqual('It will be nice');
  });
});
