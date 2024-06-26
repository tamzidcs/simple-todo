import { shallow } from 'enzyme';
import React from 'react';
import Header from '../components/views/Header/Header';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
describe('Header', () => {
  it('should render header', () => {
    const wrapper = shallow(<Header />);
  });
});
