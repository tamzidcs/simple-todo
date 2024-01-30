import React, { useEffect, useState } from 'react';
import { todo } from '../../interfaces/todo';
import './AddTodo.scss';
import { postTodo } from '../../api/todos';
import { TodoAlert } from '../TodoAlert/TodoAlert';
import { alert } from '../../interfaces/alert';

export function AddTodo(props: { taskListUpdate: () => void }) {
  const username = String(localStorage.getItem('username'));
  const newTodo: todo = { title: '', description: '', username };
  const alertInitialValue: alert = { severity: 'success', message: '' };
  const [data, setData] = useState<todo>(newTodo);
  const { taskListUpdate } = props;
  const [alert, setAlert] = useState(alertInitialValue);
  const alertTimeOut = 3000;
  const newTodoSuccessMessage = 'New Todo Added.';
  const alertSuccess = 'success';

  useEffect(() => {
    setTimeout(() => setAlert(alertInitialValue), alertTimeOut);
  }, [alert]);

  const addTodoHandler = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (data.title && data.description && data.username) {
      try {
        const result = await postTodo(data);
        if (result) {
          taskListUpdate();
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
    <div className="add-todo-container">
      <form className="add-todo-form" onSubmit={addTodoHandler}>
        <label className="title-label" htmlFor="title-textfield">
          Title
          <input
            id="title-textfield"
            className="title-textfield"
            data-testid="title-textfield"
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </label>
        <label className="description-label" htmlFor="description-textfield">
          Desciption
          <textarea
            id="description-textfield"
            className="description-textfield"
            data-testid="description-textfield"
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </label>
        <div className="add-button-container">
          <button className="add-button" data-testid="add-button" type="submit">
            Add
          </button>
        </div>
      </form>
      {alert.message !== '' ? <TodoAlert severity={alert.severity} message={alert.message} /> : ''}
    </div>
  );
}
export default AddTodo;
