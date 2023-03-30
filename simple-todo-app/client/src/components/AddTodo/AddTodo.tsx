import React from "react";
import { useState } from "react";
import { todo } from "../../interfaces/todo";
import "./AddTodo.scss";
import { postTodo } from "../../api/todos"

export const AddTodo = (props: { taskListUpdate: () => void }) => {
  const newTodo: todo = { title: "", description: "", username: "" };
  const [data, setData] = useState<todo>(newTodo);
  const username = localStorage.getItem('username');

  const addTodoHandler = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (username) {
      setData({ ...data, username: username });
    }
    if (data.title && data.description && data.username) {
      const result = await postTodo(data);
      if (result) {
        await props.taskListUpdate();
        alert('New todo Added.');
      }
      else {
        alert('Add todo Failed.');
      }
    }
  };

  return (
    <div className="add-todo-container">
      <form className="add-todo-form" onSubmit={addTodoHandler}>
        <label className="title-label">Title</label>
        <input
          className="title-textfield"
          type="text"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <label className="description-label">Desciption</label>
        <textarea
          className="description-textfield"
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
        <div className="add-button-container">
          <input className="add-button" type="submit" value="Add" />
        </div>
      </form>
    </div>
  );
};
export default AddTodo;
