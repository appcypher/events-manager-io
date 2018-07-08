import React from 'react';
import { shallow } from 'enzyme';
import HomeSlantCard from '../../../client/src/components/HomeSlantCard';

describe('HomeSlantCard', () => {
  let wrapper;

  it('Should maintain existing snapshot', () => {
    wrapper = shallow(<HomeSlantCard />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render component', () => {
    wrapper = shallow(<HomeSlantCard />);
    expect(wrapper.length).toEqual(1);
  });
});
