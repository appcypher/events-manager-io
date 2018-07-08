import React from 'react';
import { shallow } from 'enzyme';
import DiscoverTitleCard from '../../../client/src/components/DiscoverTitleCard';

describe('DiscoverTitleCard', () => {
  let wrapper;

  it('Should maintain existing snapshot', () => {
    wrapper = shallow(<DiscoverTitleCard />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render connected component', () => {
    wrapper = shallow(<DiscoverTitleCard />);
    expect(wrapper.length).toEqual(1);
  });
});
