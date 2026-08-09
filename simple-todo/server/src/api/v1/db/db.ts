import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import { AppDataSource } from "./data-source.js";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

export async function initializeDatabase() {
  try {
    await AppDataSource.initialize();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
export default AppDataSource;