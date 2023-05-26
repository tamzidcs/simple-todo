import { shallow } from 'enzyme';
import React from 'react';
import AddToDo from '../components/AddTodo/AddTodo';
import axios from "axios";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from '../components/Todo/ToDoList';
import userEvent from '@testing-library/user-event';
import { postTodo } from '../api/todos';
import { todo } from '../interfaces/todo';


const mockedUsedNavigate = jest.fn();
jest.mock("axios");
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const newTodo: todo = {
  title: "todo1",
  description: "desc1",
  username: 'user1'
};
const mockTaskListUpdate = jest.fn();

describe("AddToDo", () => {
  beforeEach(() => {
    localStorage.setItem('username', 'user1');
    render(<AddToDo taskListUpdate={mockTaskListUpdate} />);
  });
  describe("when clicked", () => {
    let addButton: HTMLInputElement;
    let titleTextField: HTMLInputElement;
    let descriptionTextField: HTMLInputElement;
    beforeEach( async() => {
      addButton = screen.getByTestId("add-button") as HTMLInputElement;
      titleTextField = screen.getByTestId("title-textfield") as HTMLInputElement;
      descriptionTextField = screen.getByTestId("description-textfield") as HTMLInputElement;

      (axios.post as jest.Mock).mockResolvedValue({ data: newTodo });
      const result = await postTodo(newTodo);
      await waitFor(() => fireEvent.change(titleTextField, { target: { value: 'title1' } }));
      await waitFor(() => fireEvent.change(descriptionTextField, { target: { value: 'description1' } }));
      await waitFor(() => fireEvent.click(addButton));
    });
    it("calls the prop function to update list", async () => {
      expect(titleTextField.value).toBe('title1')
    })
    it("calls the prop function to update list", async () => {
      expect(descriptionTextField.value).toBe('description1')
    })
    it("calls the prop function to update list", async () => {
      expect(mockTaskListUpdate.mock.calls).toHaveLength(1);
    })
  });
});
