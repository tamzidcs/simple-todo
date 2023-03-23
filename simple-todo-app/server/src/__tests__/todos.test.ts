import request from "supertest";
import { describe, expect, test } from "@jest/globals";
import db from "../db";
import app from "../app";

beforeEach(async () => {
  jest.clearAllMocks();
  await db.sync({ alter: true });
});

describe("GET /todos", () => {
  it("should respond with a 200 status code", async () => {
    debugger;
    const response = await request(app).get("/todos/user1");
    expect(response.status).toBe(200);
  });
});
