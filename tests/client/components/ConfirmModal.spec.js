import React from 'react';
import { shallow } from 'enzyme';
import ConfirmModal from '../../../client/src/components/ConfirmModal';

describe('ConfirmModal', () => {
  let wrapper;
  const confirmModalState = {
    message: '',
    show: true,
    type: 'error',
    continueTest: '',
    callback: () => {},
  };

  it('Should maintain existing snapshot', () => {
    wrapper = shallow(<ConfirmModal confirmModalState={confirmModalState} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render connected component', () => {
    wrapper = shallow(<ConfirmModal confirmModalState={confirmModalState} />);
    expect(wrapper.length).toEqual(1);
  });
});
