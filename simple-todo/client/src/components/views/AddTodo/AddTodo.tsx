import React, { useEffect, useState } from 'react';
import { todo } from '../../../interfaces/todo';
import './AddTodo.scss';
import { postTodo } from '../../../api/todos';
import { TodoAlert } from '../TodoAlert/TodoAlert';
import { alert } from '../../../interfaces/alert';
import { Button } from '../Button/Button';

interface AddTodoProps {
  updateTaskList: ()=> void;
}
export function AddTodo({ updateTaskList } : AddTodoProps) {
  const username = String(localStorage.getItem('username'));
  const newTodoInitialState: todo = { title: '', description: '', username };
  const [newTodo, setNewTodo] = useState<todo>(newTodoInitialState);
  const alertInitialValue: alert = { severity: 'success', message: '' };
  const [alert, setAlert] = useState(alertInitialValue);
  const alertTimeOut = 3000;
  const newTodoSuccessMessage = 'New Todo Added.';
  const alertSuccess = 'success';

  useEffect(() => {
    setTimeout(() => setAlert(alertInitialValue), alertTimeOut);
  }, [alert]);

  const handleAddTodo = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (newTodo.title && newTodo.description && newTodo.username) {
      try {
        const result = await postTodo(newTodo);
        if (result) {
          updateTaskList();
          setAlert({ severity: alertSuccess, message: newTodoSuccessMessage });
        } else {
          setAlert('new_todo_failed');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="add-todo-container box">
      <form className="add-todo-form" onSubmit={handleAddTodo}>
        <label className="title-label" htmlFor="title-textfield">
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
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
          />
        </label>
        <div className="add-button-container">
          <Button
            text="Add"
            className="button add-button"
            testId="add-button"
            type="submit"
          />
        </div>
      </form>
      {alert.message !== '' ? (
        <TodoAlert severity={alert.severity} message={alert.message} />
      ) : (
        ''
      )}
    </div>
  );
}
export default AddTodo;
