"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTasks = exports.addNewTask = void 0;
const Task_1 = __importDefault(require("../db/models/Task"));
const User_1 = __importDefault(require("../db/models/User"));
const TaskUser_1 = __importDefault(require("../db/models/TaskUser"));
function addNewTask(newTask) {
    return __awaiter(this, void 0, void 0, function* () {
        const task = new Task_1.default();
        task.title = newTask.title;
        task.description = newTask.description;
        task.status = newTask.status;
        yield task.save();
        const taskUser = new TaskUser_1.default();
        taskUser.userId = newTask.userId;
        taskUser.taskId = task.id;
        yield taskUser.save();
        return task;
    });
}
exports.addNewTask = addNewTask;
function getAllTasks(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.default.findOne({ where: { username: username } });
        const allTaskUser = yield TaskUser_1.default.findAll({ where: { userId: user === null || user === void 0 ? void 0 : user.id } });
        const tasks = yield Task_1.default.findAll({ where: { id: allTaskUser.map((allTaskUser) => { return allTaskUser.taskId; }) } });
        return tasks;
    });
}
exports.getAllTasks = getAllTasks;
