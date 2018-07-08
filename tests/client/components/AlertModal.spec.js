import React from 'react';
import { shallow } from 'enzyme';
import AlertModal from '../../../client/src/components/AlertModal';

describe('AlertModal', () => {
  let wrapper;
  const alertModalState = {
    message: '',
    show: true,
    type: 'error',
  };

  it('Should maintain existing snapshot', () => {
    wrapper = shallow(<AlertModal alertModalState={alertModalState} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render connected component', () => {
    wrapper = shallow(<AlertModal alertModalState={alertModalState} />);
    expect(wrapper.length).toEqual(1);
  });
});
