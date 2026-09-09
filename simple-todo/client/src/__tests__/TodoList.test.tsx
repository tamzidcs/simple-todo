import React from 'react';
import axios from 'axios';
import { waitFor, screen, fireEvent } from '@testing-library/react';
import {
  beforeEach,
  describe,
  expect, it, Mock, vi,
} from 'vitest';
import TodoList from '../components/views/TodoList/TodoList';
import renderWithProvider from '../utils/renderWithProvider';
import { todo } from '../interfaces/todo';

const mockedUsedNavigate = vi.fn();
const updateUserShareName = vi.fn();
const handleShareTodo = vi.fn();
const handleTodoDone = vi.fn();

vi.mock('axios');
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const testTodos: todo[] = [
  {
    id: '1',
    title: 'todo1',
    description: 'desc1',
    status: 'pending',
    username: 'user1',
  },
  {
    id: '2',
    title: 'todo2',
    description: 'desc2',
    status: 'pending',
    username: 'user1',
  },
  {
    id: '3',
    title: 'todo3',
    description: 'desc3',
    status: 'pending',
    username: 'user1',
  },
];

const userNameList = [{ id: '1', username: 'user1' }];

const initialState = {
  todos: testTodos,
};
describe('TodoList', () => {
  beforeEach(() => {
    localStorage.setItem('username', 'user1');
    (axios.get as Mock).mockResolvedValue({ data: testTodos });
    renderWithProvider(
      <TodoList
        todoList={testTodos}
        userNameList={userNameList}
        updateUserShareName={updateUserShareName}
        handleShareTodo={handleShareTodo}
        handleTodoDone={handleTodoDone}
      />,
      { preloadedState: initialState },
    );
  });
  it('should render the todos list', async () => {
    const todoList = await waitFor(() => screen.findAllByTestId('todo'));
    expect(todoList).toHaveLength(3);
  });
  describe('TodoDone', () => {
    describe('when done button is clicked', () => {
      let doneButton: HTMLButtonElement;
      it('should call handle todo done', async () => {
        doneButton = screen.getByTestId(
          'todo-done-button-1',
        ) as HTMLButtonElement;
        await waitFor(() => fireEvent.click(doneButton));
        expect(handleTodoDone).toHaveBeenCalled();
      });
    });
  });
});
