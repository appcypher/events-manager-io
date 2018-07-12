import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import ConnectedAddEventModal, { AddEventModal } from '../../../client/src/components/AddEventModal';
import mockStore from '../mocks/storeMock';
import { mockAxios } from '../mocks/axiosMock';

describe('AddEventModal', () => {
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
    wrapper = shallow(<ConnectedAddEventModal store={store} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render connected component', () => {
    wrapper = mount(<Provider store={store}><ConnectedAddEventModal /></Provider>);
    expect(wrapper.length).toEqual(1);
  });

  it('should respond to change event and change the state of modal', () => {
    wrapper = mount(<AddEventModal store={store} />);
    wrapper.find('#add-event-title').simulate('change', { target: { name: 'title', value: 'Party' } });
    expect(wrapper.state('title')).toEqual('Party');
  });

  it('should respond to change event and change the state of modal', () => {
    wrapper = mount(<AddEventModal store={store} />);
    wrapper.find('#add-event-description').simulate('change', { target: { name: 'description', value: 'It will be nice' } });
    expect(wrapper.state('description')).toEqual('It will be nice');
  });

  it('should call pickCenter when center is selected', () => {
    wrapper = mount(<AddEventModal store={store} />);

    const func1 = sinon.spy(wrapper.instance(), 'pickCenter');

    wrapper.instance().pickCenter(1, '', { value: '' })();

    expect(func1.called).toBeTruthy();
  });
});
