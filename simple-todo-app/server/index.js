const express = require('express')
const cors = require('cors')
const fs = require('fs')
let {pool: pool} = require("./src/app/db")
const db = require('./src/app/db')
const PORT = process.env.PORT || 3005;

const app = express()
app.use(express.json());
app.use(cors());

app.get("/tasks/:username", db.getTaskByUsername);
app.put("/tasks/:taskId", db.getTaskById);
app.post("/login", db.login);
app.post("/tasks", db.getTasks);
app.post("/share", db.share);
app.post("/users", db.addUser)
app.get("/users", db.getUsers);

app.listen(PORT, () => {
    console.log(`Server listening  on ${PORT}`);
})

