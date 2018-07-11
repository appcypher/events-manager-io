import React from 'react';
import { shallow } from 'enzyme';
import HomeShowcaseSection from '../../../client/src/components/HomeShowcaseSection';

describe('HomeShowcaseSection', () => {
  let wrapper;

  it('Should maintain existing snapshot', () => {
    wrapper = shallow(<HomeShowcaseSection />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render component', () => {
    wrapper = shallow(<HomeShowcaseSection />);
    expect(wrapper.length).toEqual(1);
  });
});
