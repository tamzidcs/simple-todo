import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Signup from '../components/pages/Signup/Signup';

const mockedUsedNavigate = jest.fn();
const mockHandleOnSubmit = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Signup', () => {
  it('should have username,password text-fields,labels and also signup button', () => {
    render(<Signup />);
    expect(screen.getAllByText('Signup')).toHaveLength(2);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Signup' })).toBeInTheDocument();
  });

  it('should submit the form with valid data', async () => {
    render(<Signup />);
    screen.getByRole('form', { name: 'signup-form' }).onsubmit = mockHandleOnSubmit;
    fireEvent.change(screen.getByTestId('username-textfield'), {
      target: { value: 'user1' },
    });
    fireEvent.change(screen.getByTestId('password-textfield'), {
      target: { value: 'pass123' },
    });
    await fireEvent.click(screen.getByTestId('signup-button'));

    expect(mockHandleOnSubmit).toHaveBeenCalled();
  });
});
