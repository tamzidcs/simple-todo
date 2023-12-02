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
exports.shareTodo = exports.updateTodoStatus = exports.getAllTodos = exports.addNewTodo = void 0;
const Todo_1 = __importDefault(require("../db/models/Todo"));
const User_1 = __importDefault(require("../db/models/User"));
const TodoUser_1 = __importDefault(require("../db/models/TodoUser"));
const PendingStatus = "pending";
const DoneStatus = "done";
function addNewTodo(newTodo) {
    return __awaiter(this, void 0, void 0, function* () {
        const todo = new Todo_1.default({
            title: newTodo.title,
            description: newTodo.description,
            status: PendingStatus,
        });
        const savedTodo = yield todo.save();
        if (savedTodo) {
            const user = yield User_1.default.findOne({ where: { username: newTodo.username } });
            if (user) {
                const todoUser = new TodoUser_1.default({
                    userId: user === null || user === void 0 ? void 0 : user.id,
                    todoId: todo.id,
                });
                yield todoUser.save();
            }
            else {
                throw new Error("User not found");
            }
        }
        else {
            throw new Error("Invalid ToDo");
        }
        return todo;
    });
}
exports.addNewTodo = addNewTodo;
function getAllTodos(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.default.findOne({ where: { username: username } });
        const allTodoUser = yield TodoUser_1.default.findAll({ where: { userId: user === null || user === void 0 ? void 0 : user.id } });
        const todos = yield Todo_1.default.findAll({
            where: {
                id: allTodoUser.map((allTodoUser) => {
                    return allTodoUser.todoId;
                }),
                status: PendingStatus,
            },
        });
        return todos;
    });
}
exports.getAllTodos = getAllTodos;
function updateTodoStatus(todoId) {
    return __awaiter(this, void 0, void 0, function* () {
        const affectedRows = yield Todo_1.default.update({ status: DoneStatus }, { where: { id: todoId } });
        if (affectedRows[0] === 0) {
            throw new Error("status update failed.");
        }
        return todoId;
    });
}
exports.updateTodoStatus = updateTodoStatus;
function shareTodo(newTodoUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const todoUser = new TodoUser_1.default();
        const user = yield User_1.default.findOne({
            where: { username: newTodoUser.username },
        });
        todoUser.userId = user === null || user === void 0 ? void 0 : user.id;
        todoUser.todoId = newTodoUser.todoId;
        const todoUserFound = yield TodoUser_1.default.findOne({
            where: { userId: todoUser.userId, todoId: todoUser.todoId },
        });
        if (!todoUserFound) {
            yield todoUser.save();
            return todoUser;
        }
        return todoUserFound;
    });
}
exports.shareTodo = shareTodo;
