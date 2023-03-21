import Todo from "../db/models/Todo";
import User from "../db/models/User";
import TodoUser from "../db/models/TodoUser";
import TodoInput from '../interface/todo';
import TodoUserInput from '../interface/todoUser';
import { where } from "sequelize";

export async function addNewTodo(newTodo: TodoInput): Promise<Todo> {
  const todo = new Todo();
  todo.title = newTodo.title;
  todo.description = newTodo.description;
  todo.status = "pending";
  await todo.save();
  
  const todoUser = new TodoUser();
  const user =  await User.findOne({where: {username: newTodo.username}})
  todoUser.userId = user?.id;
  todoUser.todoId = todo.id;
  await todoUser.save();

  return todo;
}

export async function getAllTodos(username: string): Promise<Todo[]> {
  const user = await User.findOne({where: {username: username}})
  const allTodoUser = await TodoUser.findAll({where:{userId: user?.id}})
  const todos = await Todo.findAll({where:{id: allTodoUser.map((allTodoUser)=>{return allTodoUser.todoId}), status: 'pending'}});
  return todos;
}

export async function updateTodoStatus(todoId: string): Promise<string> {
  const affectedRows = await Todo.update({status:'done'},{where:{id: todoId}})
  if(affectedRows[0] === 0) {
    throw new Error('status update failed.');
  }
  return todoId;
}

export async function shareTodo(newTodoUser: TodoUserInput): Promise<TodoUser> {
  const todoUser = new TodoUser();
  const user =  await User.findOne({where: {username: newTodoUser.username}})
  todoUser.userId = user?.id;
  todoUser.todoId = newTodoUser.todoId;
  const todoUserFound =  await TodoUser.findOne({where: {userId: todoUser.userId, todoId: todoUser.todoId}})
  if(!todoUserFound) {
    await todoUser.save();
    return todoUser;
  }
  return todoUserFound;
}