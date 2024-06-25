import React from 'react';
import './Todo.scss';
import { todo } from '../../../interfaces/todo';

type Props = {
  todoItem: todo;
};
export function Todo({ todoItem }: Props) {
  return (
    <div className="todo">
      <div className="title box">{todoItem.title}</div>
      <div className="description box">{todoItem.description}</div>
    </div>
  );
}
export default Todo;
