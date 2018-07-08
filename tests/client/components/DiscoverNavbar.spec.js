import React from 'react';
import { shallow } from 'enzyme';
import DiscoverNavbar from '../../../client/src/components/DiscoverNavbar';

describe('DiscoverNavbar', () => {
  let wrapper;

  it('Should maintain existing snapshot', () => {
    wrapper = shallow(<DiscoverNavbar />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render connected component', () => {
    wrapper = shallow(<DiscoverNavbar />);
    expect(wrapper.length).toEqual(1);
  });
});
