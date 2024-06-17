import React from 'react';
import { render, screen } from '@testing-library/react';
import Signup from '../components/Signup/Signup';

const mockedUsedNavigate = jest.fn();
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
});
