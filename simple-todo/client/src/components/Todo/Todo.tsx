import React from 'react';
import './Todo.scss';
import { todo } from '../../interfaces/todo';

type Props = {
  todoItem: todo;
};
export function Todo({ todoItem }: Props) {
  return (
    <div className="todo">
      <div className="title">{todoItem.title}</div>
      <div className="description">{todoItem.description}</div>
    </div>
  );
}
export default Todo;
