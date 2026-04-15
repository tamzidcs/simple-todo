import { render } from '@testing-library/react';
import Header from '../components/views/TopBar/TopBar';
import { vi } from 'vitest';

const mockedUsedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
describe('Header', () => {
  it('should render header', () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<Header />);
  });
});
