import { shallow } from 'enzyme';
import React from 'react';
import Login from '../components/pages/Login/Login';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

it('should render signup', () => {
  shallow(<Login />);
});
