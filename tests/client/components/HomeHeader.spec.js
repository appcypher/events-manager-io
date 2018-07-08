import React from 'react';
import { shallow } from 'enzyme';
import HomeHeader from '../../../client/src/components/HomeHeader';

describe('HomeHeader', () => {
  let wrapper;

  it('Should maintain existing snapshot', () => {
    wrapper = shallow(<HomeHeader />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render component', () => {
    wrapper = shallow(<HomeHeader />);
    expect(wrapper.length).toEqual(1);
  });
});
