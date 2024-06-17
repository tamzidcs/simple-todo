import { shallow } from 'enzyme';
import React from 'react';
import axios from 'axios';
import { render, waitFor, screen } from '@testing-library/react';
import TodoList from '../components/Pages/TodoList/TodoList';

const mockedUsedNavigate = jest.fn();
jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const dummyTodos = [
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
describe('TodoList', () => {
  it('should render todos list', async () => {
    localStorage.setItem('username', 'user1');
    (axios.get as jest.Mock).mockResolvedValue({ data: dummyTodos });
    render(<TodoList />);
    const todoList = await waitFor(() => screen.findAllByTestId('todo'));
    expect(todoList).toHaveLength(3);
  });
});
