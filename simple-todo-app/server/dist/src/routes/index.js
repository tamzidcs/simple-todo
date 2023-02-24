"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_1 = require("./tasks");
class Router {
    constructor(app) {
        app.use('/tasks', new tasks_1.TaskRouter().router);
    }
}
exports.default = Router;
