import { shallow } from 'enzyme';
import React from 'react';
import Signup from '../components/pages/Signup/Signup';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

it('should render signup', () => {
  shallow(<Signup />);
});
