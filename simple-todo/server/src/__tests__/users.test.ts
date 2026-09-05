import request from "supertest";
import status from "http-status";
import { initializeDatabase } from "../db";
import app from "../app";
import { User } from "../db/entities/User.js";
import { registerUser } from "../service/user.service";
import { AppDataSource } from "../db/data-source";
import {
  beforeEach, describe, expect, it, Mock, vi,
} from 'vitest';

const createUser = async () => {
  const user = new User();
  user.username = "user3";
  user.password = "123456";

  await registerUser(user);
};

beforeAll(async () => {
  await initializeDatabase();
  await createUser();
});

afterAll(async () => {
  await AppDataSource.manager
    .createQueryBuilder(User, "user")
    .delete()
    .execute();
  await AppDataSource.destroy();
});

describe("Users", () => {
  describe("POST /users", () => {
    it("should return the JSON for the created user", async () => {
      const user = {
        username: "user4",
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
        username: "user3",
        password: "123456",
      };
      const response = await request(app).post("/login").send(user);
      expect(response.status).toEqual(status.OK);
      const userResponse = response.body;
      expect(userResponse).toEqual({
        username: "user3",
      });
    });
  });
});
