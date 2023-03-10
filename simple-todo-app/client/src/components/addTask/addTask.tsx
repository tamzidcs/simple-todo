import { AxiosError } from "axios";
import React from "react";
import { useState } from "react";
import { task } from "../../interfaces/task";
import "./addTask.scss";
import addNewTask from "../../api/tasks"

export const AddTask = (props: { taskListUpdate: () => void }) => {
  const newTask: task = { title: "", description: "", username: "" };
  const [data, setData] = useState<task>(newTask);
  const username = localStorage.getItem('username');

  const addTaskHandler = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if(username) {
        setData({...data,username: username});
    }
    if (data.title && data.description && data.username)  {
        const result = await addNewTask(data);
        if(result) {
            props.taskListUpdate();
            alert('New Task Added.')
        }
        else {
            alert('Add Task Failed.')
        }
    }
  };

  return (
    <div className="add-task-container">
      <form onSubmit={addTaskHandler}>
        <label className="titleLabel">Title</label>
        <input
          className="titleTextField"
          type="text"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <label className="descriptionLabel">Desciption</label>
        <textarea
          className="descriptionTextField"
          onChange={(e) => setData({...data,description:e.target.value})}
        />
        <div className="addButtonDiv">
          <input className="addButton" type="submit" value="Add" />
        </div>
      </form>
    </div>
  );
};
