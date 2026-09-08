import React from 'react';
import axios from 'axios';
import {
  waitFor, screen, fireEvent,
} from '@testing-library/react';
import {
  beforeEach, describe, expect, it, Mock, vi,
} from 'vitest';
import TodoList from '../components/pages/TodoList/TodoList';
import renderWithProvider from '../utils/renderWithProvider';
import * as todoApi from '../api/todos';

const mockedUsedNavigate = vi.fn();

vi.mock('axios');
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const testTodos = [
  {
    id: '1',
    title: 'todo1',
    description: 'desc1',
    status: 'pending',
  },
  {
    id: '2',
    title: 'todo2',
    description: 'desc2',
    status: 'pending',
  },
  {
    id: '3',
    title: 'todo3',
    description: 'desc3',
    status: 'pending',
  },
];

const initialState = {
  todos: testTodos,
};
describe('TodoList', () => {
  let todoList: HTMLElement[];
  beforeEach(() => {
    localStorage.setItem('username', 'user1');
    (axios.get as Mock).mockResolvedValue({ data: testTodos });
    renderWithProvider(<TodoList />, { preloadedState: initialState });
  });
  it('should render todos list', async () => {
    todoList = await waitFor(() => screen.findAllByTestId('todo'));
    expect(todoList).toHaveLength(3);
  });
  describe('TodoDone', () => {
    describe('when done button is clicked', () => {
      let doneButton: HTMLButtonElement;
      beforeEach(async () => {
      });
      it('should call update todo ', async () => {
        doneButton = screen.getByTestId('todo-done-button-1') as HTMLButtonElement;
        const spy = vi.spyOn(todoApi, 'updateTodo').mockResolvedValue({
          id: '1',
          title: 'todo1',
          description: 'desc1',
          username: 'user1',
        });
        await waitFor(() => fireEvent.click(doneButton));
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
