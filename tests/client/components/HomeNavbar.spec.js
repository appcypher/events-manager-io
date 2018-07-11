import React from 'react';
import { shallow } from 'enzyme';
import HomeNavbar from '../../../client/src/components/HomeNavbar';

describe('HomeNavbar', () => {
  let wrapper;

  it('Should maintain existing snapshot', () => {
    wrapper = shallow(<HomeNavbar />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render component', () => {
    wrapper = shallow(<HomeNavbar />);
    expect(wrapper.length).toEqual(1);
  });
});
