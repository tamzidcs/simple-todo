import request from "supertest";
import status from "http-status";
import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  jest,
  test,
} from "@jest/globals";
import { initializeDatabase } from "../db";
import app from "../app";
import { Todo } from "../db/entities/Todo.js";
import { User } from "../db/entities/User.js";
import { registerUser } from "../service/user.service";
import { addNewTodo } from "../service/todo.service";
import todo from "../interface/todo";
import { AppDataSource } from "../db/data-source";

const createUsers = async () => {
  const user = new User();
  user.username = "user1";
  user.password = "123456";

  const user2 = new User();
  user.username = "user2";
  user.password = "123456";

  await registerUser(user);
  await registerUser(user2);
};

let todoId: Number;
const createToDo = async () => {
  const newTodo: todo = {
    title: "todo1",
    description: "description1",
    username: "user1",
    status: "pending",
    id: "",
  };

  const newToDoResponse = await addNewTodo(newTodo);
  todoId = newToDoResponse.id;
};

beforeAll(async () => {
  await initializeDatabase();
  await createUsers();
  await createToDo();
});

afterAll(async () => {
  await AppDataSource.createQueryBuilder().delete().from(User).execute();
  await AppDataSource.createQueryBuilder().delete().from(Todo).execute();
  await AppDataSource.destroy();
});

describe("Todo", () => {
  describe("GET /todos", () => {
    it("should respond with a 200 status code", async () => {
      const response = await request(app).get("/todos/user1");
      expect(response.status).toBe(status.OK);
    });
  });

  describe("POST /todos", () => {
    it("should respond with a 200 status code", async () => {
      const response = await request(app).post("/todos").send({
        title: "todo2",
        description: "description2",
        status: "pending",
        username: "user1",
      });
      expect(response.status).toBe(status.OK);
    });
  });

  describe("POST /share", () => {
    it("should respond with a 200 status code", async () => {
      const response = await request(app).post("/share").send({
        todoId: todoId,
        username: "user2",
      });
      expect(response.status).toBe(status.OK);
    });
  });

  describe("PATCH /todos", () => {
    it("should respond with a 200 status code", async () => {
      const response = await request(app).patch("/todos/" + todoId);
      expect(response.status).toBe(status.OK);
    });
  });
});
 