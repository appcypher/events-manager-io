import React from 'react';
import { shallow } from 'enzyme';
import ConnectedDiscover from '../../../client/src/containers/Discover';
import mockStore from '../mocks/storeMock';
// import sinon from 'sinon';

describe('<Discover />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore();
    wrapper = shallow(<ConnectedDiscover store={store} />);
  });

  it('should render dumb component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('Should maintain existing snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  // it('Should maintain existing snapshot', () => {
  //   const spy = sinon.spy(ConnectedDiscover.prototype, 'handleChange');
  //   wrapper = shallow(<ConnectedDiscover store={store} />);
  //   wrapper
  //     .find('input')
  //     .first()
  //     .simulate('change', { target: {email: 'demola@test.com', password: 'password'} })
  //   expect(spy.called).toBeTruthy();
  //   spy.restore()
  // });
});
