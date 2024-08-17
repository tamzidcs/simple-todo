import React, { useState } from 'react';
import { todo } from '../../../interfaces/todo';
import './AddTodo.scss';
import { postTodo } from '../../../api/todos';

export function AddTodo(props: { updateTaskList: () => void }) {
  const username = String(localStorage.getItem('username'));
  const newTodoInitialState: todo = { title: '', description: '', username };
  const [newTodo, setNewTodo] = useState<todo>(newTodoInitialState);
  const { updateTaskList } = props;

  const handleAddTodo = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (newTodo.title && newTodo.description && newTodo.username) {
      try {
        const result = await postTodo(newTodo);
        if (result) {
          updateTaskList();
          alert('New todo Added.');
        } else {
          alert('Add todo Failed.');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="add-todo-container">
      <form className="add-todo-form" onSubmit={handleAddTodo}>
        <label className="title-label" htmlFor="title-label">
          Title
          <input
            id="title-label"
            className="title-textfield"
            data-testid="title-textfield"
            type="text"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          />
        </label>
        <label className="description-label" htmlFor="description-label">
          Desciption
          <textarea
            id="description-label"
            className="description-textfield"
            data-testid="description-textfield"
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })}
          />
        </label>
        <div className="add-button-container">
          <button className="add-button" data-testid="add-button" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddTodo;
