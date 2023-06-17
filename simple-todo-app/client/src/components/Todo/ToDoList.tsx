import { Header } from "../Header/Header";
import { useEffect, useState } from "react";
import { AddTodo } from "../AddTodo/AddTodo";
import React from "react";
import "./ToDoList.scss";
import axios from "axios";
import { getTodo, postTodoShare, updateTodoDone } from "../../api/todos";
import { todo } from "../../interfaces/todo";

const url = {
  todos: "http://localhost:3005/todos/",
  users: "http://localhost:3005/users/",
  share: "http://localhost:3005/share/",
};

export const ToDoList = () => {
  const [data, setData] = useState<todo[]>([]);
  const [userNameList, setUserNameList] = useState<any[]>([]);
  const [shareUserName, setShareUserName] = useState("");
  const [taskListUpdated, setTodoListUpdated] = useState(false);

  const getTodosByParam = async (param: string) => {
    const localStorageItem = localStorage.getItem(param);
    if (localStorageItem) {
      try {
        const result = await getTodo(localStorageItem);
        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const taskListUpdate = () => {
    setTodoListUpdated(true);
  };

  useEffect(() => {
    getTodosByParam("username");
    setTodoListUpdated(false);
    axios.get(url.users).then((resp: { data: any }) => {
      setUserNameList(resp.data);
    });
  }, [taskListUpdated]);

  const todoDone = (taskId: string) => {
    updateTodoDone(taskId);
    getTodosByParam("username");
  };

  const todoShare = async (todoId: any, userName: string) => {
    const result = await postTodoShare(todoId, userName)
    if (result) {
      alert('Todo shared with ' + userName);
    }
  };

  return (
    <div className="to-do-list-container">
      <Header />
      <AddTodo taskListUpdate={taskListUpdate} />
      <div className="todolist">
        {data.length > 0 ? data.map((todo) => (
          <div className="todo-container" key={todo.id}>
            <div className="todo">
              <div className="todo-top">
                <div className="title">{todo.title}</div>
                <div className="done-button">
                  <button onClick={() => todoDone(String(todo.id))}> Done</button>
                </div>
              </div>
              <div className="description">{todo.description}</div>
            </div>
            <div className="shareToDo">
              <input
                className="user-name-input"
                list="userNameList"
                type="text"
                placeholder="select user"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setShareUserName(e.target.value)
                }
              />
              <datalist id="userNameList">
                {userNameList.map((val, indx) => (
                  <option key={indx}>{val.username}</option>
                ))}
              </datalist>
              <button onClick={() => todoShare(todo.id, shareUserName)}>
                {" "}
                Share
              </button>
            </div>
          </div>
        )) : <div></div>}
      </div>
    </div>
  );
};
export default ToDoList;
