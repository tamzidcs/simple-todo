import request from "supertest";
import status from "http-status";
import { describe, expect, test } from "@jest/globals";
import { initializeDatabase } from "../../../db";
import app from "../../../app";
import { User } from "../db/models";
import { registerUser } from "../service/user.service";

const createUser = async () => {
  const user = new User({
    username: "user3",
    password: "123456",
  });

  await registerUser(user);
};

beforeAll(async () => {
  jest.clearAllMocks();
  initializeDatabase();
  await createUser();
});

afterAll(async () => {
  await User.destroy({
    where: {},
    truncate: true
  });
});

describe("Users", () => {
  describe("POST /users", () => {
    it("should respond with a 201 status code", async () => {
      const user = {
        username: "user4",
        password: "123456",
      };
      const response = await request(app).post("/users").send(user);
      expect(response.status).toEqual(status.CREATED);
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
        username: "user3",
        password: "123456",
      };
      const response = await request(app).post("/login").send(user);
      expect(response.status).toEqual(status.OK);
      const userResponse = response.body;
      expect(userResponse).toEqual({
        message: "Login successfull.",
      });
    });
  });
});
