import request from "supertest";
import status from "http-status";
import { afterAll, beforeAll, describe, expect, it, test, vi } from "vitest";
import AppDataSource, { initializeDatabase } from "../db/db.js";
import app from "../../../app.js";
import { Todo } from "../db/entity/Todo.js";
import { User } from "../db/entity/User.js";
import { registerUser } from "../service/user.service.js";
import { addNewTodo } from "../service/todo.service.js";
import todo from "../interface/todo.js";

const createUsers = async () => {
  const user = new User();
  user.username = "user1";
  user.password = "123456";

  const user2 = new User()
  user2.username = "user2";
  user2.password = "123456";

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
    dueDate: ""
  };

  const newToDoResponse = await addNewTodo(newTodo);
  todoId = newToDoResponse.id;
};

beforeAll(async () => {
  vi.clearAllMocks();
  initializeDatabase();
  await createUsers();
  await createToDo();
});

afterAll(async () => {
  await AppDataSource
  .createQueryBuilder()
  .delete()
  .from(User)
  .execute()

  await AppDataSource
  .createQueryBuilder()
  .delete()
  .from(Todo)
  .execute()
});

describe("Todo", () => {
  describe("GET /todos", () => {
    it("should respond with a 200 status code", async () => {
      const response = await request(app).get("/todos/user1");
      expect(response.status).toBe(status.OK);
    });
  });

  describe("POST /todos", () => {
    it("should respond with a 201 status code", async () => {
      const response = await request(app).post("/todos").send({
        title: "todo2",
        description: "description2",
        status: "pending",
        username: "user1",
      });
      expect(response.status).toBe(status.CREATED);
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
