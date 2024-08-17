import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '../../views/Header/Header';
import { AddTodo } from '../../views/AddTodo/AddTodo';
import './TodoList.scss';
import { getTodo, postTodoShare, updateTodoDone } from '../../../api/todos';
import { todo } from '../../../interfaces/todo';
import Todo from '../../views/Todo/Todo';

const url = {
  todos: 'http://localhost:3005/todos/',
  users: 'http://localhost:3005/users/',
  share: 'http://localhost:3005/share/',
};
interface GetAllUserResponse {
  id: string,
  username: string
}

export function TodoList() {
  const [todoList, setTodoList] = useState<todo[]>([]);
  const [userNameList, setUserNameList] = useState<GetAllUserResponse[]>([]);
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
    axios.get(url.users).then((resp: { data: GetAllUserResponse[] }) => {
      setUserNameList(resp.data);
    });
  }, [taskListUpdated]);

  const todoDone = async (taskId: string) => {
    await updateTodoDone(taskId);
    getTodosByParam('username');
  };

  const shareTodo = async (todoId: string, userName: string) => {
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
                    {userNameList.map((userNameListItem) => (
                      <option key={userNameListItem.id}>
                        {userNameListItem.username}
                      </option>
                    ))}
                  </datalist>
                  <button
                    className="share-button"
                    type="button"
                    onClick={() =>
                      shareTodo(String(todoItem.id), shareUserName)}
                  >
                    Share
                  </button>
                </div>
                <div className="done-button">
                  <button
                    type="button"
                    onClick={() => todoDone(String(todoItem.id))}
                  >
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
