import axios from 'axios';
import { waitFor, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/views/TodoList/TodoList';
import renderWithProvider from '../utils/renderWithProvder';
import { vi, type Mock } from 'vitest';

const mockedUsedNavigate = vi.fn();
const updateUserShareName = vi.fn();
const handleShareTodo = vi.fn();
const handleTodoDone = vi.fn();
const handleDueDateChange = vi.fn();

vi.mock('axios');
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const tomorrow:Date = new Date();
tomorrow.setDate(tomorrow.getDate()+1);
const dueDateString:string = tomorrow.toISOString().split('T')[0];

const testTodos = [
  {
    id: '1',
    title: 'todo1',
    description: 'desc1',
    status: 'pending',
    dueDate: dueDateString,
  },
  {
    id: '2',
    title: 'todo2',
    description: 'desc2',
    status: 'pending',
    dueDate: dueDateString,
  },
  {
    id: '3',
    title: 'todo3',
    description: 'desc3',
    status: 'pending',
    dueDate: dueDateString,
  },
];

const userNameList = [{ id: '1', username: 'user1' }];

const initialState = {
  todos: testTodos,
};

describe("TodoList", () => {
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
        handleDueDateChange={handleDueDateChange}
      />,
      { preloadedState: initialState },
    );
  });
  it("should render todos list", async () => {
    const todoList = await waitFor(() => screen.findAllByTestId("todo"));
    expect(todoList).toHaveLength(3);
  });
  describe("TodoDone", () => {
    describe("when done button is clicked", () => {
      let doneButton: HTMLButtonElement;
      it("should call todo done", async () => {
        doneButton = screen.getByTestId(
          "todo-done-button-1",
        ) as HTMLButtonElement;
        await waitFor(() => fireEvent.click(doneButton));
        expect(handleTodoDone).toHaveBeenCalled();
      });
    });
  });
});
