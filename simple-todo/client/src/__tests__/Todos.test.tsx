import React from 'react';
import axios from 'axios';
import { waitFor, screen } from '@testing-library/react';
import {
  describe,
  expect, it, Mock, vi,
} from 'vitest';
import TodoList from '../components/pages/TodoList/TodoList';
import renderWithProvider from '../utils/renderWithProvider';

const mockedUsedNavigate = vi.fn();
vi.mock('axios');
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const testTodos = [
  {
    id: 1,
    title: 'todo1',
    description: 'desc1',
    status: 'pending',
  },
  {
    id: 2,
    title: 'todo2',
    description: 'desc2',
    status: 'pending',
  },
  {
    id: 3,
    title: 'todo3',
    description: 'desc3',
    status: 'pending',
  },
];

const initialState = {
  todos: testTodos,
};
describe('TodoList', () => {
  it('should render todos list', async () => {
    localStorage.setItem('username', 'user1');
    (axios.get as Mock).mockResolvedValue({ data: testTodos });
    renderWithProvider(<TodoList />, { preloadedState: initialState });
    const todoList = await waitFor(() => screen.findAllByTestId('todo'));
    expect(todoList).toHaveLength(3);
  });
});
