import React from 'react';
import { shallow } from 'enzyme';
import LoginContainer from '../../../client/src/components/LoginContainer';

describe('LoginContainer', () => {
  let wrapper;

  it('Should maintain existing snapshot', () => {
    wrapper = shallow(<LoginContainer />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render component', () => {
    wrapper = shallow(<LoginContainer />);
    expect(wrapper.length).toEqual(1);
  });
});
