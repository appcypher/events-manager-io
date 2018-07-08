import React from 'react';
import { shallow } from 'enzyme';
import MainFab from '../../../client/src/components/MainFab';

describe('MainFab', () => {
  let wrapper;

  it('Should maintain existing snapshot', () => {
    wrapper = shallow(<MainFab />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render component', () => {
    wrapper = shallow(<MainFab />);
    expect(wrapper.length).toEqual(1);
  });
});
