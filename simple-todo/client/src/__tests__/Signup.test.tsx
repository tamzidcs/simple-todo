import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Signup from '../components/pages/Signup/Signup';

const mockedUsedNavigate = jest.fn();
const mockHandleOnSubmit = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

it('should render signup form', () => {
  render(<Signup />);
  expect(screen.getByTestId('signup-header')).toBeInTheDocument();
  expect(screen.getByTestId('signup-button')).toBeInTheDocument();
  expect(screen.getByTestId('username-label')).toBeInTheDocument();
  expect(screen.getByTestId('username-textfield')).toBeInTheDocument();
  expect(screen.getByTestId('password-label')).toBeInTheDocument();
  expect(screen.getByTestId('password-textfield')).toBeInTheDocument();
});

it('should submit the form with valid data', async () => {
  render(<Signup />);
  screen.getByRole(
    'form',
    { name: 'signup-form' },
  ).onsubmit = mockHandleOnSubmit;
  fireEvent.change(screen.getByTestId('username-textfield'), {
    target: { value: 'user1' },
  });
  fireEvent.change(screen.getByTestId('password-textfield'), {
    target: { value: 'pass123' },
  });
  await fireEvent.click(screen.getByTestId('signup-button'));

  expect(mockHandleOnSubmit).toHaveBeenCalled();
});
