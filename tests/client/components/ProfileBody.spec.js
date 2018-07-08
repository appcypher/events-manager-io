import React from 'react';
import { shallow } from 'enzyme';
import ProfileBody from '../../../client/src/components/ProfileBody';

describe('ProfileBody', () => {
  let wrapper;

  it('Should maintain existing snapshot', () => {
    wrapper = shallow(<ProfileBody />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render connected component', () => {
    wrapper = shallow(<ProfileBody />);
    expect(wrapper.length).toEqual(1);
  });
});
