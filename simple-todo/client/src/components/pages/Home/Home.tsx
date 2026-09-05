import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { RootState } from '../../../store/store';
import AddTodo from '../../views/AddTodo/AddTodo';
import TopBar from '../../views/TopBar/TopBar';
import updateTodoList, { TodoList } from '../../views/TodoList/TodoList';
import './Home.scss';
import { getTodo, postTodoShare, updateTodo } from '../../../api/todos';
import { setAllTodos } from '../../../store/slices/todosSlice';
import { todo } from '../../../interfaces/todo';
import { userNameListItem } from '../../../interfaces/userNameListItem';
import URL from '../../../shared/constants';

export function Home() {
  const todoList = useSelector((state: RootState) => state.todos);
  const [todoListUpdated, setTodoListUpdated] = useState(false);
  const [userNameList, setUserNameList] = useState<userNameListItem[]>([]);
  const [shareUserName, setShareUserName] = useState('');
  const dispatch = useDispatch();

  const handleTodoListUpdate = () => {
    setTodoListUpdated(true);
  };

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

  const removeCurrentUsernameFromList = (userNameList: userNameListItem[]) => {
    const currentUsername = localStorage.getItem('username');
    userNameList.forEach((userNameListItem, userNameListIndex) => {
      if (userNameListItem.username === currentUsername) {
        userNameList.splice(userNameListIndex, 1);
      }
    });
    return userNameList;
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

  const handleTodoDone = async (todoId: string, updateFields: {}) => {
    await updateTodo(todoId, updateFields);
    handleTodoListUpdate();
  };

  const handleShareTodo = (todoId: string) => {
    shareTodo(todoId, shareUserName);
  };

  useEffect(() => {
    getTodosByParam('username');
    setTodoListUpdated(false);
    axios.get(URL.users).then((resp: { data: [] }) => {
      const userNameList = removeCurrentUsernameFromList(resp.data);
      setUserNameList(userNameList);
    });
  }, [todoListUpdated]);

  return (
    <div className="home-container">
      <TopBar />
      <AddTodo handleTodoListUpdate={handleTodoListUpdate} />
      <TodoList
        todoList={todoList}
        userNameList={userNameList}
        updateUserShareName={updateUserShareName}
        handleShareTodo={handleShareTodo}
        handleTodoDone={handleTodoDone}
      />
    </div>
  );
}
export default Home;
