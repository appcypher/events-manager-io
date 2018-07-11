import React from 'react';
import { shallow } from 'enzyme';
import SignIn from '../../../client/src/containers/SignIn';

describe('<SignIn />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SignIn />);
  });

  it('should render dumb component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should maintain existing snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
