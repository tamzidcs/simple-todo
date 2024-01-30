# Simple Todo App
Simple Todo app using React, Node, Express and Postgres.

## Pre-Installation:
Create ```.env.development``` and ```.env.test``` file inside the server folder. Follow the template bellow and replace with appropriate values.
Add seperate database(DB_NAME) for development and test.
  ```
    DB_NAME=xxx
    DB_HOST=xxx
    DB_USERNAME=xxx
    DB_PASSWORD=xxx
    DB_DIALECT='postgres'
    LOG_LEVEL='debug'
  ```

## Installation:
### Server:

1. Install packages:
```cmd
    npm install
```
2. Run database script.
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

### Tests:
1. Run test db script from the server folder.
```cmd 
    npm run db:test
```
2. Run inside server or client folder to test them.
```cmd 
    npm run test
```

