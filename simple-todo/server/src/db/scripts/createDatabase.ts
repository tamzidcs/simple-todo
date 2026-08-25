import pg from 'pg';
import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const { Client } = pg;
export async function createDatabase() {
  const targetDB = process.env.DB_NAME;
  const client = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "postgres",
  });

  try {
    await client.connect();
    const checkDBQuery = `SELECT 1 FROM  pg_database  WHERE datname = $1`;
    const res = await client.query(checkDBQuery, [targetDB]);

    if (res.rowCount && res.rowCount > 0) {
      console.log(`Database "${targetDB}" already exists.`);
    } else {
      await client.query(`CREATE DATABASE "${targetDB}"`);
      console.log('Database "${targetDB}" successfully created!');
    }
  } catch (error) {
    console.log("Error during database creation:", error);
  } finally {
    await client.end();
  }
}

createDatabase();
