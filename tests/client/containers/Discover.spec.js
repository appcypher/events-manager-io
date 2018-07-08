import React from 'react';
import { shallow } from 'enzyme';
import ConnectedDiscover from '../../../client/src/containers/Discover';
import mockStore from '../mocks/storeMock';

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
});
