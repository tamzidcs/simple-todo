module.exports = function(app) {
    const task = require('../controllers/task.controller');
    // app.get("/tasks/:username", db.getTaskByUsername);
    // app.put("/tasks/:taskId", db.getTaskById);
    // app.post("/login", db.login);
    app.post("/tasks", task.create);
    // app.post("/share", db.share);
    // app.post("/users", db.addUser);
    // app.get("/users", db.getUsers);
}