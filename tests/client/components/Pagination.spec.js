import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../../../client/src/components/Pagination';

describe('Pagination', () => {
  let wrapper;

  it('Should maintain existing snapshot', () => {
    wrapper = shallow(<Pagination />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render component', () => {
    wrapper = shallow(<Pagination />);
    expect(wrapper.length).toEqual(1);
  });
});
