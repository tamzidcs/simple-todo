import { render } from '@testing-library/react';
import TopBar from '../components/views/TopBar/TopBar';
import { vi } from 'vitest';

const mockedUsedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
describe('TopBar', () => {
  it('should render header', () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<TopBar />);
  });
});
