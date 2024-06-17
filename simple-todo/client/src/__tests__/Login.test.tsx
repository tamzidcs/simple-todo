import { render, screen } from '@testing-library/react';
import React from 'react';
import Login from '../components/Login/Login';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
describe('Login', () => {
  it('should have username,password text-fields,labels and also login and signup button', () => {
    render(<Login />);
    expect(screen.getAllByText('Login')).toHaveLength(2);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByText('Signup')).toBeInTheDocument();
  });
});
