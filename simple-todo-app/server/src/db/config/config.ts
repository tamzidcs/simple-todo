import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const config = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT
};

export default config;