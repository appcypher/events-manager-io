import React from 'react';
import { shallow } from 'enzyme';
import Navbar from '../../../client/src/components/Navbar';

describe('Navbar', () => {
  let wrapper;

  it('Should maintain existing snapshot', () => {
    wrapper = shallow(<Navbar />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render component', () => {
    wrapper = shallow(<Navbar />);
    expect(wrapper.length).toEqual(1);
  });
});
