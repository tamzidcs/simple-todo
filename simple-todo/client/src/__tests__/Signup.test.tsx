import { render, screen } from '@testing-library/react';
import Signup from '../components/pages/Signup/Signup';
import { vi } from 'vitest';

const mockedUsedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Signup', () => {
  it('should have username,password text-fields,labels and also signup button', () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<Signup />);
    expect(screen.getAllByText('Signup')).toHaveLength(2);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Signup' })).toBeInTheDocument();
  });
});
