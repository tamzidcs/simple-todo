# Simple ToDo App
Simple ToDO app using React, Node, Express and Postgres.
# How to run:
# Pre-Installation:
Create a .env file inside server folder. Follow the template bellow and replace with appropriate values.
  ```
    DB_NAME=xxx
    DB_HOST=xxx
    DB_USERNAME=xxx
    DB_PASSWORD=xxx
    DB_DIALECT=xxx
    LOG_LEVEL=xxx
    NODE_ENV=xxx
  ```
# Database:
1. Export the db(postgres) from 'todolist_db.sql'
    - Run(from powershell):
    ```
        psql -U username -d  todolist_db -f todolist_db.sql
    ```

2. Update database(postgres) credentials in ./server/config.js

# Server:

1. Install packages:
    ```cmd
    npm install
    ```
2. Run the server:
    ```cmd
    npm run dev
    ```

# Client:

1. Install packages:
    ```cmd 
    npm install
    ```
2. Run the react app:
    ```cmd 
    npm start
    ```
