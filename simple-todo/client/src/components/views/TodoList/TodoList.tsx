import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { setAllTodos } from '../../../store/slices/todosSlice';
import './TodoList.scss';
import { getTodo, postTodoShare, updateTodo } from '../../../api/todos';
import Todo from '../Todo/Todo';
import DropDown from '../DropDown/DropDown';
import { userNameListItem } from '../../../interfaces/userNameListItem';
import { todo } from '../../../interfaces/todo';

interface TodoListProps {
  todoList: todo[];
  userNameList: userNameListItem[];
  // eslint-disable-next-line no-unused-vars
  updateUserShareName: (username: string) => void;
  // eslint-disable-next-line no-unused-vars
  handleShareTodo: (todoId: string) => void;
  // eslint-disable-next-line no-unused-vars
  handleTodoDone: (todoId: string, updateFields: {}) => void;
}

export function TodoList({
  todoList,
  userNameList,
  updateUserShareName,
  handleShareTodo,
  handleTodoDone,
}: TodoListProps) {
  return (
    <div className="to-do-list-container">
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
                    onClick={() => handleShareTodo(String(todoItem.id))}
                  >
                    Share
                  </button>
                </div>
                <div className="done-button">
                  <button
                    type="button"
                    onClick={() => handleTodoDone(String(todoItem.id), { status: 'done' })}
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
