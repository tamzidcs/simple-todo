import { render } from '@testing-library/react';
import React from 'react';
import {
  it, vi,
} from 'vitest';
import TopBar from '../components/views/TopBar/TopBar';

const mockedUsedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

it('should render signup', () => {
  render(<TopBar />);
});
