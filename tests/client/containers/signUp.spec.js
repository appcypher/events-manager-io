import React from 'react';
import { shallow } from 'enzyme';
import SignUp from '../../../client/src/containers/SignUp';

describe('<SignUp />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SignUp />);
  });

  it('should render dumb component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('Should maintain existing snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
