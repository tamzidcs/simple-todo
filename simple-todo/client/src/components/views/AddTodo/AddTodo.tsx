import { useState } from "react";
import type { todoRequest } from "../../../interfaces/todo";
import "./AddTodo.scss";
import { postTodo } from "../../../api/todos";
import { Button } from "../Button/Button";
import DatePicker from "../DatePicker/DatePicker";
import { useToast } from "../../../hooks/useToast";

interface AddTodoProps {
  handleTodoListUpdate: () => void;
}
export function AddTodo({ handleTodoListUpdate }: AddTodoProps) {
  const username = String(localStorage.getItem("username"));
  const newTodoInitialState: todoRequest = {
    title: "",
    description: "",
    username,
    dueDate: "",
  };
  const [newTodo, setNewTodo] = useState<todoRequest>(newTodoInitialState);
  const toastSeveritySuccess = "success";
  const toastSeverityError = "error";
  const showToast = useToast();
  const newTodoSuccessMessage = "New Todo Added.";
  const newTodoFailedMessage = "New Todo Failed.";

  const handleAddTodo = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (
      newTodo.title &&
      newTodo.description &&
      newTodo.username &&
      newTodo.dueDate
    ) {
      try {
        const result = await postTodo(newTodo);
        if (result) {
          handleTodoListUpdate();
          showToast(newTodoSuccessMessage, toastSeveritySuccess);
        } else {
          showToast(newTodoFailedMessage, toastSeverityError)
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      showToast(newTodoFailedMessage, toastSeverityError);
    }
  };

  return (
    <div className="add-todo-container box">
      <form className="add-todo-form" onSubmit={handleAddTodo}>
        <label className="add-todo-title" htmlFor="title-textfield">
          Title
          <input
            id="title-textfield"
            className="title-textfield box"
            data-testid="title-textfield"
            type="text"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          />
        </label>
        <label className="description-label" htmlFor="description-textfield">
          Desciption
          <textarea
            id="description-textfield"
            className="description-textfield box"
            data-testid="description-textfield"
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })
            }
          />
        </label>
        <div className="add-button-container">
          <div className="add-button-bottom-left">
            <label className="due-date-label">Due Date</label>
            <DatePicker
              id="due-date-add-todo"
              className={"due-date-add-todo"}
              testId={"due-date-add-todo"}
              onChange={(e) =>
                setNewTodo({ ...newTodo, dueDate: e.target.value })
              }
            />
          </div>
          <Button
            text="Add"
            className="button add-button"
            testId="add-button"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}
export default AddTodo;
