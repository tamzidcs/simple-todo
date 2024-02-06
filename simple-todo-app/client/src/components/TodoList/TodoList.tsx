import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '../Header/Header';
import { AddTodo } from '../AddTodo/AddTodo';
import './TodoList.scss';
import { getTodo, postTodoShare, updateTodoDone } from '../../api/todos';
import { todo } from '../../interfaces/todo';
import Todo from '../Todo/Todo';

const url = {
  todos: 'http://localhost:3005/todos/',
  users: 'http://localhost:3005/users/',
  share: 'http://localhost:3005/share/',
};

export function TodoList() {
  const [todoList, setTodoList] = useState<todo[]>([]);
  const [userNameList, setUserNameList] = useState<any[]>([]);
  const [shareUserName, setShareUserName] = useState('');
  const [taskListUpdated, setTodoListUpdated] = useState(false);

  const getTodosByParam = async (param: string) => {
    const localStorageItem = localStorage.getItem(param);
    if (localStorageItem) {
      try {
        const result = await getTodo(localStorageItem);
        if (result) {
          setTodoList(result);
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  const updateTaskList = () => {
    setTodoListUpdated(true);
  };

  useEffect(() => {
    getTodosByParam('username');
    setTodoListUpdated(false);
    axios.get(url.users).then((resp: { data: any }) => {
      setUserNameList(resp.data);
    });
  }, [taskListUpdated]);

  const todoDone = (taskId: string) => {
    updateTodoDone(taskId);
    getTodosByParam('username');
  };

  const shareTodo = async (todoId: any, userName: string) => {
    const result = await postTodoShare(todoId, userName);
    if (result) {
      alert(`Todo shared with ${userName}`);
    }
  };

  return (
    <div className="to-do-list-container">
      <Header />
      <AddTodo updateTaskList={updateTaskList} />
      <div className="todolist">
        {todoList.length > 0 ? (
          todoList.map((todoItem) => (
            <div
              className="todo-container"
              key={todoItem.id}
              data-testid="todo"
            >
              <Todo todoItem={todoItem} />
              <div className="todo-bottom">
                <div className="share-todo">
                  <input
                    className="user-name-input"
                    list="userNameList"
                    type="text"
                    placeholder="select user"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setShareUserName(e.target.value)}
                  />
                  <datalist id="userNameList">
                    {userNameList.map((todoListItem) => (
                      <option key={todoListItem.id}>
                        {todoListItem.username}
                      </option>
                    ))}
                  </datalist>
                  <button
                    className="share-button"
                    type="button"
                    onClick={() => shareTodo(todoItem.id, shareUserName)}
                  >
                    {' '}
                    Share
                  </button>
                </div>
                <div className="done-button">
                  <button
                    type="button"
                    onClick={() => todoDone(String(todoItem.id))}
                  >
                    {' '}
                    Done
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
export default TodoList;
