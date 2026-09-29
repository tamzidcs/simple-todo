import axios from "axios";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import AddTodo from "../components/views/AddTodo/AddTodo";
import { postTodo } from "../api/todos";
import type { todoRequest } from "../interfaces/todo";
import { vi, type Mock } from "vitest";
import { ToastContext } from "../components/views/ToastProvider/ToastProvider";
import { ToastProvider } from "../components/views/ToastProvider/ToastProvider";

const mockedUsedNavigate = vi.fn();
const mockedShowToast = vi.fn();

vi.mock("axios");
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

const newTodo: todoRequest = {
  title: "todo1",
  description: "desc1",
  username: "user1",
  dueDate: "2026-12-12",
};
const mockUpdateTaskList = vi.fn();

describe("AddTodo", () => {
  beforeEach(() => {
    localStorage.setItem("username", "user1");
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<AddTodo handleTodoListUpdate={mockUpdateTaskList} />, {
      wrapper: ({ children }) => (
        <ToastContext.Provider value={mockedShowToast}>
          {children}
        </ToastContext.Provider>
      ),
    });
  });
  describe("when clicked", () => {
    let addButton: HTMLInputElement;
    let titleTextField: HTMLInputElement;
    let descriptionTextField: HTMLInputElement;
    beforeEach(async () => {
      addButton = screen.getByTestId("add-button") as HTMLInputElement;
      titleTextField = screen.getByTestId(
        "title-textfield",
      ) as HTMLInputElement;
      descriptionTextField = screen.getByTestId(
        "description-textfield",
      ) as HTMLInputElement;
      window.alert = () => {};
      (axios.post as Mock).mockResolvedValue({ data: newTodo });
      await postTodo(newTodo);
      await waitFor(() =>
        fireEvent.change(titleTextField, { target: { value: "title1" } }),
      );
      await waitFor(() =>
        fireEvent.change(descriptionTextField, {
          target: { value: "description1" },
        }),
      );
      await waitFor(() => fireEvent.click(addButton));
    });
    it("title textfield has the correct value", async () => {
      expect(titleTextField.value).toBe("title1");
    });
    it("description textfield has the correct value", async () => {
      expect(descriptionTextField.value).toBe("description1");
    });
    it("calls the prop function to update list", async () => {
      expect(mockUpdateTaskList.mock.calls).toHaveBeenCalled;
    });
  });
});
