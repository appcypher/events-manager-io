import React from 'react';
import { shallow } from 'enzyme';
import LabelledFab from '../../../client/src/components/LabelledFab';

describe('LabelledFab', () => {
  let wrapper;

  it('Should maintain existing snapshot', () => {
    wrapper = shallow(<LabelledFab />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render component', () => {
    wrapper = shallow(<LabelledFab />);
    expect(wrapper.length).toEqual(1);
  });
});
