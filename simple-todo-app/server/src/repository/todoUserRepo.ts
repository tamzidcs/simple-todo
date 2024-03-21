import { TodoUser } from "../db/models";

export function createTodoUser(todoUser: TodoUser) {
  return todoUser.save();
}
