# Simple Todo
Simple Todo web application using React, Node, Express and Postgres.

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
2. Run setup script:
```cmd
    npm run dev:prep
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

#### Server:

1. Run test setup script from the server folder.
```cmd 
    npm run test:prep
```
2. Run inside server.
```cmd 
    npm run test
```
#### Client:

1. Run inside client.
```cmd 
    npm test
