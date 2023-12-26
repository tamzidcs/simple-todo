import { Header } from "../Header/Header";
import { useEffect, useState } from "react";
import { AddTodo } from "../AddTodo/AddTodo";
import React from "react";
import "./ToDoList.scss";
import axios from "axios";
import { getTodo, postTodoShare, updateTodoDone } from "../../api/todos";
import { todo } from "../../interfaces/todo";
import DropDown from "../DropDown/DropDown";

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
        alert(error);
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

  const handleTodoListClick = () => {
    
  }

  const updateUserShareName = (username: string)=> {
    setShareUserName(username);
  }

  return (
    <div className="to-do-list-container">
      <Header />
      <AddTodo taskListUpdate={taskListUpdate} />
      <div className="todolist" onClick={handleTodoListClick}>
        {data.length > 0 ? data.map((todo) => (
          <div className="todo-container" key={todo.id} data-testid='todo'>
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
              <DropDown userNameList = {userNameList} updateUserShareName = {updateUserShareName}/>
              <button className="share-button" onClick={() => todoShare(todo.id, shareUserName)}>
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
