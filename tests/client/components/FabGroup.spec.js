import React from 'react';
import { shallow } from 'enzyme';
import FabGroup from '../../../client/src/components/FabGroup';

describe('FabGroup', () => {
  let wrapper;

  it('Should maintain existing snapshot', () => {
    wrapper = shallow(<FabGroup />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render connected component', () => {
    wrapper = shallow(<FabGroup />);
    expect(wrapper.length).toEqual(1);
  });
});
