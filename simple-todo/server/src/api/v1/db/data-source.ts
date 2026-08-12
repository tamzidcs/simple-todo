import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "./entity/User.js";
import { Todo } from "./entity/Todo.js";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [User, Todo],
  migrations: [ "src/api/v1/db/migration/**/*.ts"],
  subscribers: [],
});
