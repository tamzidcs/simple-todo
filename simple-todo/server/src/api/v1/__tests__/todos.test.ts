import request from "supertest";
import status from "http-status";
import { describe, expect, test } from "@jest/globals";
import { initializeDatabase } from "../db/db";
import app from "../../../app";
import { Todo, TodoUser, User } from "../db/models";
import { registerUser } from "../service/user.service";
import { addNewTodo } from "../service/todo.service";
import todo from "../interface/todo";

const createUsers = async () => {
  const user = new User({
    username: "user1",
    password: "123456",
  });

  const user2 = new User({
    username: "user2",
    password: "123456",
  });

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
  jest.clearAllMocks();
  initializeDatabase();
  await createUsers();
  await createToDo();
});

afterAll(async () => {
  await User.destroy({
    where: {},
    truncate: true
  });
  await Todo.destroy({
    where: {},
    truncate: true
  });
  await TodoUser.destroy({
    where: {},
    truncate: true
  });
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
