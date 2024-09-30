import { Todo, User } from "../db/models";
import * as UserRepo from "../repository/userRepo";
import * as TodoUserRepo from "../repository/todoUserRepo";
import { globalConstants } from "../shared/globalConstants";

export function createTodo(todo: Todo) {
  return todo.save();
}

export function getTodoByUsername(username: string) {
  return User.findOne({ where: { username: username } });
}

export function getTodoById(id: string) {
  return Todo.findOne({ where: { id: id } });
}

export async function getAllTodosByUsernameStatus(username: string,todoStatus: string) {
  const user = await UserRepo.getUserByUsername(username);
  const allTodoUser = await TodoUserRepo.getAllTodoUserByUserId(user?.id);
  return Todo.findAll({
    where: {
      id: allTodoUser.map((allTodoUser) => {
        return allTodoUser.todoId;
      }),
      status: todoStatus,
    },
  });
}

export function updateTodoStatusById(todoId: string, todoStatus: string) {
  return Todo.update(
    { status: globalConstants.TodoStatusDone },
    { where: { id: todoId } }
  );
}
