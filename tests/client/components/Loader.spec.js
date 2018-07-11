import React from 'react';
import { shallow } from 'enzyme';
import Loader from '../../../client/src/components/Loader';

describe('Loader', () => {
  let wrapper;

  it('Should maintain existing snapshot', () => {
    wrapper = shallow(<Loader />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render component', () => {
    wrapper = shallow(<Loader />);
    expect(wrapper.length).toEqual(1);
  });
});
