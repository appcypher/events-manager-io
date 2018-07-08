import React from 'react';
import { shallow } from 'enzyme';
import mockStore from '../mocks/storeMock';
import ConnectedProfile from '../../../client/src/containers/Profile';

describe('<Profile />', () => {
  let wrapper;
  let store;

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
});
