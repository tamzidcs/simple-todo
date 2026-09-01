import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import AddTodo from '../../views/AddTodo/AddTodo';
import TopBar from '../../views/TopBar/TopBar';
import updateTodoList, { TodoList } from '../../views/TodoList/TodoList';
import './Home.scss';
import toast from 'react-hot-toast';

export function Home() {
  const todoList = useSelector((state:RootState) => state.todos);
  const [todoListUpdated, setTodoListUpdated] = useState(false);

  const handleAddTodo = () => {
    setTodoListUpdated(true);
  };

  return (
    <div className="home-container">
      <TopBar />
      <AddTodo handleAddTodo={handleAddTodo} />
      <TodoList
        todoList={todoList}
        todoListUpdated={todoListUpdated}
        setTodoListUpdated={setTodoListUpdated}
      />
    </div>
  );
}
export default Home;
