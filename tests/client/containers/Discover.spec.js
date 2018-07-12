import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ConnectedDiscover, { Discover } from '../../../client/src/containers/Discover';
import mockStore from '../mocks/storeMock';
import { mockAxios } from '../mocks/axiosMock';
import url from '../../../client/src/url';

describe('<Discover />', () => {
  let wrapper;
  let store;
  const mock = mockAxios();

  beforeEach(() => {
    localStorage.setItem('user.admin', 'true');
    store = mockStore();
    const user = { token: '', user: {} };
    wrapper = shallow(<Discover getAllCenters={() => {}} user={user} />);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should render dumb component', () => {
    wrapper = shallow(<ConnectedDiscover store={store} />);
    expect(wrapper.length).toEqual(1);
  });

  it('should maintain existing snapshot', () => {
    wrapper = shallow(<ConnectedDiscover store={store} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call hide/show functions when AddCenterModal form is opened, filled, and submitted', () => {
    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ConnectedDiscover />
        </Provider>
      </BrowserRouter>);

    const func1 = sinon.spy(wrapper.find('Discover').instance(), 'hideAddCenterModal');
    const func2 = sinon.spy(wrapper.find('Discover').instance(), 'showAddCenterModal');

    wrapper.find('#main-fab').simulate('click');
    wrapper.find('#fab-2').simulate('click');
    wrapper.find('#add-center-name').simulate('change', { target: { value: 'Test' } });
    wrapper.find('#add-center-description').simulate('change', { target: { value: 'Test' } });
    wrapper.find('#add-center-type').simulate('change', { target: { value: 'Test' } });
    wrapper.find('#add-center-location').simulate('change', { target: { value: 'Test' } });
    wrapper.find('#add-center-price').simulate('change', { target: { value: '5000' } });
    wrapper.find('.add-center-available input[type="checkbox"]').first().simulate('change', { currentTarget: { checked: false } });
    wrapper.find('.add-center-facilities input[type="checkbox"]').at(1).simulate('change', { currentTarget: { checked: true } });
    wrapper.find('#add-center-pictures').simulate('change', { target: { files: ['image/path'] } });
    wrapper.find('Discover').instance().hideAddCenterModal();
    wrapper.find('#add-center-submit').simulate('click');

    expect(func1.called).toBeTruthy();
    expect(func2.called).toBeTruthy();
    sinon.reset();
  });

  it('should call hide/show functions when ModifyCenterModal form is opened, filled, and submitted', () => {
    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ConnectedDiscover />
        </Provider>
      </BrowserRouter>);

    const func1 = sinon.spy(wrapper.find('Discover').instance(), 'hideModifyCenterModal');
    const func2 = sinon.spy(wrapper.find('Discover').instance(), 'showModifyCenterModal');

    wrapper.find('.io-center-card').first().simulate('click');
    wrapper.find('#modify-center').first().simulate('click');
    wrapper.find('#modify-center-name').simulate('change', { target: { value: 'Test' } });
    wrapper.find('#modify-center-description').simulate('change', { target: { value: 'Test' } });
    wrapper.find('#modify-center-type').simulate('change', { target: { value: 'Test' } });
    wrapper.find('#modify-center-location').simulate('change', { target: { value: 'Test' } });
    wrapper.find('#modify-center-price').simulate('change', { target: { value: '5000' } });
    wrapper.find('.modify-center-available input[type="checkbox"]').first().simulate('change', { currentTarget: { checked: false } });
    wrapper.find('.modify-center-facilities input[type="checkbox"]').at(1).simulate('change', { currentTarget: { checked: true } });
    wrapper.find('#modify-center-pictures').simulate('change', { target: { files: ['image/path'] } });
    wrapper.find('Discover').instance().hideModifyCenterModal();
    wrapper.find('#modify-center-submit').simulate('click');

    expect(func1.called).toBeTruthy();
    expect(func2.called).toBeTruthy();
    sinon.reset();
  });


  it('should call hide/show functions when ViewCenterModal form is opened and closed', () => {
    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ConnectedDiscover />
        </Provider>
      </BrowserRouter>);

    const func1 = sinon.spy(wrapper.find('Discover').instance(), 'hideViewCenterModal');
    const func2 = sinon.spy(wrapper.find('Discover').instance(), 'showViewCenterModal');

    wrapper.find('.io-center-card').first().simulate('click');
    wrapper.find('#view-center-ok').first().simulate('click');

    expect(func1.called).toBeTruthy();
    expect(func2.called).toBeTruthy();
    sinon.reset();
  });

  it('should call hide/show functions when AddEventModal form is opened, filled, and submitted', () => {
    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ConnectedDiscover />
        </Provider>
      </BrowserRouter>);

    mock
      .onGet(`${url}/api/v1/centers?name=t`)
      .reply(200, { centers: [{ name: 'a' }, { name: 'b' }] })
      .onGet(`${url}/api/v1/centers?name=^$`)
      .reply(200, { centers: [{ name: 'a' }, { name: 'b' }] });

    const func1 = sinon.spy(wrapper.find('Discover').instance(), 'hideAddEventModal');
    const func2 = sinon.spy(wrapper.find('Discover').instance(), 'showAddEventModal');

    wrapper.find('#main-fab').simulate('click');
    wrapper.find('#fab-1').simulate('click');
    wrapper.find('#add-event-title').simulate('change', { target: { value: 'Test' } });
    wrapper.find('#add-event-description').simulate('change', { target: { value: 'Test' } });
    wrapper.find('#add-event-center').simulate('change', { currentTarget: { value: 't' } });
    wrapper.find('#add-event-date').simulate('change', { target: { value: '11-07-2018' } });
    wrapper.find('#add-event-time').simulate('change', { target: { value: '5:00PM' } });
    wrapper.find('Discover').instance().hideAddEventModal();
    wrapper.find('#add-event-submit').simulate('click');

    expect(func1.called).toBeTruthy();
    expect(func2.called).toBeTruthy();
    sinon.reset();
  });
});
