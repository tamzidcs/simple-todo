import { AppDataSource } from './db/data-source.js';
import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

export async function initializeDatabase() {
  try {
    await AppDataSource.initialize();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
