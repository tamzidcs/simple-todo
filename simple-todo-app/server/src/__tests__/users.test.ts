import request from "supertest";
import status from "http-status";
import { describe, expect, test } from "@jest/globals";
import db from "../db";
import app from "../app";

beforeEach(async () => {
  jest.clearAllMocks();
  await db.sync({ alter: true });
});

describe("POST /users", () => {
  it("should return the JSON for the created user", async () => {
    const user = {
      username: "user1",
      password: "123456",
    };
    const response = await request(app).post("/users").send(user);
    expect(response.status).toEqual(status.OK);
  });
});

describe("GET /users", () => {
  it("should respond with a 200 status code", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toEqual(status.OK);
  });
});

describe("POST /login", () => {
  it("should respond with a 200 status code", async () => {
    const user = {
      username: "user1",
      password: "123456",
    };
    const response = await request(app).post("/login").send(user);
    expect(response.status).toEqual(status.OK);
    const userResponse = response.body;
    expect(userResponse).toEqual({
      username: "user1",
    });
  });
});
