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
function addNewTask(newTask) {
    return __awaiter(this, void 0, void 0, function* () {
        const task = yield Task_1.default.create(newTask);
        return task;
    });
}
exports.addNewTask = addNewTask;
function getAllTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        const allTasks = yield Task_1.default.findAll();
        return allTasks;
    });
}
exports.getAllTasks = getAllTasks;
