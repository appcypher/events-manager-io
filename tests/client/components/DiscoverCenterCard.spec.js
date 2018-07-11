import React from 'react';
import { shallow } from 'enzyme';
import DiscoverCenterCard from '../../../client/src/components/DiscoverCenterCard';

describe('ConfirmModal', () => {
  let wrapper;
  const props = {
    name: '',
    type: '',
    location: '',
    description: '',
  };

  it('Should maintain existing snapshot', () => {
    wrapper = shallow(
      <DiscoverCenterCard
        name={props.name}
        type={props.type}
        location={props.location}
        description={props.description}
      />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render connected component', () => {
    wrapper = shallow(
      <DiscoverCenterCard
        name={props.name}
        type={props.type}
        location={props.location}
        description={props.description}
      />);
    expect(wrapper.length).toEqual(1);
  });
});
