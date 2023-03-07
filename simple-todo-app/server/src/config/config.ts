const dotenv = require('dotenv').config();

export const development =  {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    dialect: "postgres",
    port: 5432
}

export const test =  {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: "127.0.0.1",
  dialect: "postgres",
  port: 5432
}

export const production =  {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: "127.0.0.1",
  dialect: "postgres",
  port: 5432
}

