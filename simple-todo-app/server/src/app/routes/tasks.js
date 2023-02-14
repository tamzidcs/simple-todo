const db = require('../db');

module.exports = function(app) {
    app.get("/tasks/:username", db.getTaskByUsername);
    app.put("/tasks/:taskId", db.getTaskById);
    app.post("/login", db.login);
    app.post("/tasks", db.getTasks);
    app.post("/share", db.share);
    app.post("/users", db.addUser)
    app.get("/users", db.getUsers);
}