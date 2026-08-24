import request from "supertest";
import status from "http-status";
import AppDataSource, { initializeDatabase } from '../db/db.js';
import app from '../../../app.js';
import { User } from '../db/entity/User.js';
import { registerUser } from '../service/user.service.js';
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { API_CONFIG } from "../../../config/api.config.js";

const createUser = async () => {
  const user = new User();
  user.username = "user3";
  user.password = "123456";

  await registerUser(user);
};

describe("Users", () => {
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

  describe("POST /users", () => {
    it("should respond with a 201 status code", async () => {
      const user = {
        username: "user4",
        password: "123456",
      };
      const response = await request(app).post("/"+API_CONFIG.apiVersion+"/users").send(user);
      expect(response.status).toEqual(status.CREATED);
    });
  });

  describe("GET /users", () => {
    it("should respond with a 200 status code", async () => {
      const response = await request(app).get("/"+API_CONFIG.apiVersion+"/users");
      expect(response.status).toEqual(status.OK);
    });
  });

  describe("POST /login", () => {
    it("should respond with a 200 status code", async () => {
      const user = {
        username: "user3",
        password: "123456",
      };
      const response = await request(app).post("/"+API_CONFIG.apiVersion+"/login").send(user);
      expect(response.status).toEqual(status.OK);
      const userResponse = response.body;
      expect(userResponse).toEqual({
        message: "Login successfull.",
      });
    });
  });
});
