import React, { useState } from 'react';
import { todo } from '../../../interfaces/todo';
import './AddTodo.scss';
import { postTodo } from '../../../api/todos';
import toast, { Toaster } from 'react-hot-toast';

interface AddTodoProps {
  updateTodoList: ()=> void;
}

export function AddTodo({ updateTodoList } : AddTodoProps) {
  const username = String(localStorage.getItem('username'));
  const newTodoInitialState: todo = { title: '', description: '', username };
  const [newTodo, setNewTodo] = useState<todo>(newTodoInitialState);

  const handleAddTodo = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (newTodo.title && newTodo.description && newTodo.username) {
      try {
        const result = await postTodo(newTodo);
        if (result) {
          updateTodoList();
          toast.success('New todo Added.');
        } else {
          toast.error('Add todo Failed.');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="add-todo-container">
      <div><Toaster /></div>
      <form className="add-todo-form" onSubmit={handleAddTodo}>
        <label className="add-todo-title" htmlFor="title-label">
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
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
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
