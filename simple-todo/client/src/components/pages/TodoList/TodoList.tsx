import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { RootState } from '../../../store/store';
import { setAllTodos } from '../../../store/slices/todosSlice';
import { TopBar } from '../../views/TopBar/TopBar';
import { AddTodo } from '../../views/AddTodo/AddTodo';
import './TodoList.scss';
import { getTodo, postTodoShare, updateTodo } from '../../../api/todos';
import Todo from '../../views/Todo/Todo';
import DropDown from '../../views/DropDown/DropDown';
import { userNameListItem } from '../../../interfaces/userNameListItem';
import { todo } from '../../../interfaces/todo';
import globalConstants from '../../../shared/globalConstants';

const url = {
  todos: 'http://localhost:3005/todos/',
  users: 'http://localhost:3005/users/',
  share: 'http://localhost:3005/share/',
};

export function TodoList() {
  const [userNameList, setUserNameList] = useState<any[]>([]);
  const [shareUserName, setShareUserName] = useState('');
  const [todoListUpdated, setTodoListUpdated] = useState(false);
  const todoList = useSelector((state:RootState) => state.todos);
  const dispatch = useDispatch();

  const sortTodoListByLatest = (todoList: todo[]) => {
    const sortedTodoList = todoList.reverse();
    return sortedTodoList;
  };

  const getTodosByParam = async (param: string) => {
    const localStorageItem = localStorage.getItem(param);
    if (localStorageItem) {
      try {
        const result = await getTodo(localStorageItem);
        if (result) {
          const sortedTodoList = sortTodoListByLatest(result);
          dispatch(setAllTodos(sortedTodoList));
        } else {
          dispatch(setAllTodos([]));
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  const updateTodoList = () => {
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
  }, [todoListUpdated]);

  const todoDone = async (todoId: string) => {
    await updateTodo(todoId, { status: globalConstants.TodoStatusDone });
    // getTodosByParam('username');
  };

  const shareTodo = async (todoId: string, userName: string) => {
    const result = await postTodoShare(todoId, userName);
    if (result) {
      toast.success(`Todo shared with ${userName}`);
    }
  };

  const updateUserShareName = (username: string) => {
    setShareUserName(username);
  };

  return (
    <div className="to-do-list-container">
      <TopBar />
      <AddTodo updateTodoList={updateTodoList} />
      <div className="todolist">
        {todoList.length > 0 ? (
          todoList.map((todoItem) => (
            <div
              className="todo-container"
              key={todoItem.id}
              data-testid="todo"
            >
              <Todo todoItem={todoItem} />
              <div id={todoItem.id} className="todo-bottom" data-testid="todo-bottom">
                <div className="share-todo">
                  <DropDown
                    userNameList={userNameList}
                    updateUserShareName={updateUserShareName}
                  />
                  <button
                    className="share-button"
                    type="button"
                    onClick={() => shareTodo(String(todoItem.id), shareUserName)}
                  >
                    Share
                  </button>
                </div>
                <div className="done-button">
                  <button
                    type="button"
                    onClick={() => todoDone(String(todoItem.id))}
                    data-testid="todo-done-button"
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
