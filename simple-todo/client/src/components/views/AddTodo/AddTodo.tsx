import { useEffect, useState } from "react";
import type { todoRequest } from "../../../interfaces/todo";
import "./AddTodo.scss";
import { postTodo } from "../../../api/todos";
import { TodoToast } from "../TodoAlert/TodoToast";
import type { toast } from "../../../interfaces/toast";
import { Button } from "../Button/Button";
import DatePicker from "../DatePicker/DatePicker";

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
  const toastInitialValue: toast = {
    severity: toastSeveritySuccess,
    message: "",
  };
  const [toast, setToast] = useState(toastInitialValue);
  const toastTimeOut = 3000;
  const newTodoSuccessMessage = "New Todo Added.";
  const newTodoFailedMessage = "New Todo Failed.";

  useEffect(() => {
    setTimeout(() => setToast(toastInitialValue), toastTimeOut);
  }, [toast]);

  const handleAddTodo = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (newTodo.title && newTodo.description && newTodo.username && newTodo.dueDate) {
      try {
        const result = await postTodo(newTodo);
        if (result) {
          handleTodoListUpdate();
          setToast({
            severity: toastSeveritySuccess,
            message: newTodoSuccessMessage,
          });
        } else {
          setToast({
            severity: toastSeverityError,
            message: newTodoFailedMessage,
          });
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setToast({ severity: toastSeverityError, message: newTodoFailedMessage });
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
              onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
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
      <div className="toast-container">
        {toast.message !== "" ? (
          <TodoToast severity={toast.severity} message={toast.message} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default AddTodo;
