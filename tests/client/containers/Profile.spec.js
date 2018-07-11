import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import ConnectedProfile, { Profile } from '../../../client/src/containers/Profile';
import mockStore from '../mocks/storeMock';
import { mockAxios } from '../mocks/axiosMock';
import url from '../../../client/src/url';

describe('<Profile />', () => {
  let wrapper;
  let store;
  const mock = mockAxios();
  localStorage.setItem('user.admin', 'true');

  beforeEach(() => {
    store = mockStore();
    const user = { token: '', user: {} };
    wrapper = shallow(<Profile getAllCenters={() => {}} user={user} />);
  });

  afterEach(() => {
    mock.reset();
  });

  beforeEach(() => {
    store = mockStore();
    wrapper = shallow(<ConnectedProfile store={store} />);
  });

  it('should render dumb component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('Should maintain existing snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call hide/show functions when ModifyEventModal form is opened, filled, and submitted', () => {
    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ConnectedProfile />
        </Provider>
      </BrowserRouter>);

    mock
      .onGet(`${url}/api/v1/centers?name=t`)
      .reply(200, { centers: [{ name: 'a' }, { name: 'b' }] })
      .onGet(`${url}/api/v1/centers?name=^$`)
      .reply(200, { centers: [{ name: 'a' }, { name: 'b' }] });

    const func1 = sinon.spy(wrapper.find('Discover').instance(), 'hideModifyEventModal');
    const func2 = sinon.spy(wrapper.find('Discover').instance(), 'showModifyEventModal');

    wrapper.find('#main-fab').simulate('click');
    wrapper.find('#fab-1').simulate('click');
    wrapper.find('#add-event-title').simulate('change', { target: { value: 'Test' } });
    wrapper.find('#add-event-description').simulate('change', { target: { value: 'Test' } });
    wrapper.find('#add-event-center').simulate('change', { currentTarget: { value: 't' } });
    wrapper.find('#add-event-date').simulate('change', { target: { value: '11-07-2018' } });
    wrapper.find('#add-event-time').simulate('change', { target: { value: '5:00PM' } });
    wrapper.find('#add-event-submit').simulate('click');

    expect(func1.called).toBeTruthy();
    expect(func2.called).toBeTruthy();
    sinon.reset();
  });
});
