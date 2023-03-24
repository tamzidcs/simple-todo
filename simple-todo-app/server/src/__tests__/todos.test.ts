import request from "supertest";
import status from 'http-status';
import { describe, expect, test } from "@jest/globals";
import db from "../db";
import app from "../app";

beforeEach(async () => {
  jest.clearAllMocks();
  await db.sync({ alter: true });
});

describe("GET /todos", () => {
  it("should respond with a 200 status code", async () => {
    const response = await request(app).get("/todos/user1");
    expect(response.status).toBe(status.OK);
  });
});

describe("POST /todos", () => {
  it("should respond with a 200 status code", async () => {
    const response = await request(app).post("/todos").send({
      title: 'todo1',
      description: 'description1',
      status: 'pending',
      username: 'user1'
    });
    expect(response.status).toBe(status.OK);
  });
});

describe("POST /share", () => {
  it("should respond with a 200 status code", async () => { 
    const response = await request(app).post("/share").send({
      todoId: 10, 
      username: 'user2'
    });
    expect(response.status).toBe(status.OK);
  });
});

describe("PATCH /todos", () => {
  it("should respond with a 200 status code", async () => { 
    const response = await request(app).patch("/todos/1")
    expect(response.status).toBe(status.OK);
  });
});


