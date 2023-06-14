import React from "react";
import { useState } from "react";
import { todo } from "../../interfaces/todo";
import "./AddTodo.scss";
import { postTodo } from "../../api/todos"

export const AddTodo = (props: { taskListUpdate: () => void }) => {
  const username = String(localStorage.getItem('username'));
  const newTodo: todo = { title: "", description: "", username: username };
  const [data, setData] = useState<todo>(newTodo);
  
  const addTodoHandler = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (data.title && data.description && data.username) {
      try {
        const result = await postTodo(data);
        if (result) {
          await props.taskListUpdate();
          alert('New todo Added.');
        }
        else {
          alert('Add todo Failed.');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="add-todo-container">
      <form className="add-todo-form" onSubmit={addTodoHandler}>
        <label className="title-label">Title</label>
        <input
          className="title-textfield"
          data-testid="title-textfield"
          type="text"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <label className="description-label">Desciption</label>
        <textarea
          className="description-textfield"
          data-testid="description-textfield"
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
        <div className="add-button-container">
          <button className="add-button" data-testid="add-button" type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};
export default AddTodo;
