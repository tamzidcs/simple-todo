# Simple ToDo App
Simple ToDO app using React, Node, Express and Postgres.

## Pre-Installation:
Create a .env file inside server folder. Follow the template bellow and replace with appropriate values.
  ```
    DB_NAME=xxx
    DB_HOST=xxx
    DB_USERNAME=xxx
    DB_PASSWORD=xxx
    DB_DIALECT='postgres'
    LOG_LEVEL='debug'
    NODE_ENV='development'
  ```

## Installation:
### Server:

1. Install packages:
```cmd
    npm install
```
2. Run database scripts.
```cmd
    npm run db
```
3. Run the server:
```cmd
    npm run dev
```

### Client:

1. Install packages:
```cmd 
    npm install
```
2. Run the react app:
```cmd 
    npm start
```
