import request from "supertest";
import status from "http-status";
import { describe, expect, test } from "@jest/globals";
import db, { initializeDatabase } from "../db";
import app from "../app";
import { User } from "../db/models";

const createUser = async () => {
  const user = new User({
    username: "user1",
    password: "123456"
  });
  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }
};

describe("Users",()=>{
  beforeAll(async () => {
    jest.clearAllMocks();
    initializeDatabase();
    createUser();
  });
  
  describe("POST /users", () => {
    it("should return the JSON for the created user", async () => {
      const user = {
        username: "user2",
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
  
  describe("POST /users", () => {
    it("should respond with a 200 status code", async () => {
      const user = {
        username: "user1",
        password: "123456",
      };
      const response = await request(app).post("/users").send(user);
      expect(response.status).toEqual(status.OK);
      const userResponse = response.body;
      expect(userResponse).toEqual({
        username: "user1",
      });
    });
  });
})

