import { Todo, User } from "../db/models";

export function createTodo(todo: Todo) {
  return todo.save();
}

export function getTodoByUsername(username: string) {
  return User.findOne({ where: { username: username } });
}
