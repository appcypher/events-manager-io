import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../../client/src/components/Footer';

describe('Footer', () => {
  let wrapper;

  it('Should maintain existing snapshot', () => {
    wrapper = shallow(<Footer />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render component', () => {
    wrapper = shallow(<Footer />);
    expect(wrapper.length).toEqual(1);
  });
});
