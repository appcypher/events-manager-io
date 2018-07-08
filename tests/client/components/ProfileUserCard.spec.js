import React from 'react';
import { shallow } from 'enzyme';
import ProfileUserCard from '../../../client/src/components/ProfileUserCard';
import mockStore from '../mocks/storeMock';
import { mockAxios } from '../mocks/axiosMock';

describe('ProfileUserCard', () => {
  let wrapper;
  let store;
  mockAxios();

  beforeAll(() => {
    store = mockStore();
    localStorage.setItem('user.token', 'token');
    localStorage.setItem('user.admin', 'true');
  });

  afterAll(() => {
    localStorage.setItem('user.token', 'undefined');
    localStorage.setItem('user.admin', 'undefined');
  });


  it('Should maintain existing snapshot', () => {
    wrapper = shallow(<ProfileUserCard store={store} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render connected component', () => {
    wrapper = shallow(<ProfileUserCard store={store} />);
    expect(wrapper.length).toEqual(1);
  });
});
