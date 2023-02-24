"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const tasks_1 = require("./tasks");
class Router {
    static initializeRoutes(app) {
        app.use('/tasks', new tasks_1.TaskRouter().router);
    }
}
exports.Router = Router;
