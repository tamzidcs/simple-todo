import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '../../views/Header/Header';
import { AddTodo } from '../../views/AddTodo/AddTodo';
import { getTodo, postShareTodo, updateTodoDone } from '../../../api/todos';
import { todo } from '../../../interfaces/todo';
import DropDown from '../../views/DropDown/DropDown';
import './TodoList.scss';
import Todo from '../../views/Todo/Todo';
// import { button } from '../../interfaces/button';
import Button from '../../views/Button/Button';
import userNameListItem from '../../../interfaces/userNameListItem';

const url = {
  todos: 'http://localhost:3005/v1/todos/',
  users: 'http://localhost:3005/v1/users/',
  share: 'http://localhost:3005/v1/share/',
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

  const removeCurrentUsernameFromList = (userNameList: userNameListItem[]) => {
    const currentUsername = localStorage.getItem('username');
    userNameList.forEach((userNameListItem, userNameListIndex) => {
      if (userNameListItem.username === currentUsername) {
        userNameList.splice(userNameListIndex, 1);
      }
    });
    return userNameList;
  };

  useEffect(() => {
    getTodosByParam('username');
    setTodoListUpdated(false);
    axios.get(url.users).then((resp: { data: [] }) => {
      const userNameList = removeCurrentUsernameFromList(resp.data);
      setUserNameList(userNameList);
    });
  }, [taskListUpdated]);

  const todoDone = async (taskId: string) => {
    await updateTodoDone(taskId);
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
      <div className="todolist box">
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
                  <Button
                    className="button share-button"
                    testId="share-button"
                    text="Share"
                    type="button"
                    onClick={() => shareTodo(todoItem.id, shareUserName)}
                  />
                </div>
                <Button
                  className="button done-button"
                  testId="done-button"
                  text="Done"
                  type="button"
                  onClick={() => todoDone(String(todoItem.id))}
                />
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
