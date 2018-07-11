import React from 'react';
import { shallow } from 'enzyme';
import DiscoverBody from '../../../client/src/components/DiscoverBody';

describe('DiscoverBody', () => {
  let wrapper;

  it('Should maintain existing snapshot', () => {
    wrapper = shallow(<DiscoverBody />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render connected component', () => {
    wrapper = shallow(<DiscoverBody />);
    expect(wrapper.length).toEqual(1);
  });
});
