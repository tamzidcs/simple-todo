import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import {
  describe, expect, it, vi,
} from 'vitest';
import Signup from '../components/pages/Signup/Signup';

const mockedUsedNavigate = vi.fn();
const mockHandleOnSubmit = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Signup', () => {
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
});
