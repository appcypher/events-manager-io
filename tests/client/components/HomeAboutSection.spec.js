import React from 'react';
import { shallow } from 'enzyme';
import HomeAboutSection from '../../../client/src/components/HomeAboutSection';

describe('HomeAboutSection', () => {
  let wrapper;

  it('Should maintain existing snapshot', () => {
    wrapper = shallow(<HomeAboutSection />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render component', () => {
    wrapper = shallow(<HomeAboutSection />);
    expect(wrapper.length).toEqual(1);
  });
});
