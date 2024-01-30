import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '../Header/Header';
import { AddTodo } from '../AddTodo/AddTodo';
import { getTodo, postShareTodo, updateTodoDone } from '../../api/todos';
import { todo } from '../../interfaces/todo';
import DropDown from '../DropDown/DropDown';
import './TodoList.scss';
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
    const result = await postShareTodo(todoId, userName);
    if (result) {
      alert(`Todo shared with ${userName}`);
    }
  };

  const updateUserShareName = (username: string) => {
    setShareUserName(username);
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
                  <DropDown
                    userNameList={userNameList}
                    updateUserShareName={updateUserShareName}
                  />
                  <button
                    className="share-button"
                    type="button"
                    onClick={() => shareTodo(todoItem.id, shareUserName)}
                  >
                    {' '}
                    Share
                  </button>
                </div>
                <button
                  className="done-button"
                  type="button"
                  onClick={() => todoDone(String(todoItem.id))}
                >
                  {' '}
                  Done
                </button>
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
