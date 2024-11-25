import { render, screen } from '@testing-library/react';
import React from 'react';
import Signup from '../components/pages/Signup/Signup';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

it('should render signup', () => {
  render(<Signup />);
  const signupHeader = screen.getByTestId('signup-header');
  const signupButton = screen.getByTestId('signup-button');
  const usernameLabel = screen.getByTestId('username-label');
  const usernameTextfield = screen.getByTestId('username-textfield');
  const passwordLabel = screen.getByTestId('password-label');
  const passwordTextfield = screen.getByTestId('password-textfield');

  expect(signupHeader).toBeInTheDocument();
  expect(signupButton).toBeInTheDocument();
  expect(usernameLabel).toBeInTheDocument();
  expect(usernameTextfield).toBeInTheDocument();
  expect(passwordLabel).toBeInTheDocument();
  expect(passwordTextfield).toBeInTheDocument();
});
