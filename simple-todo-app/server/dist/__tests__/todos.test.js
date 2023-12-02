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
const supertest_1 = __importDefault(require("supertest"));
const http_status_1 = __importDefault(require("http-status"));
const globals_1 = require("@jest/globals");
const db_1 = require("../db");
const app_1 = __importDefault(require("../app"));
const models_1 = require("../db/models");
const user_service_1 = require("../service/user.service");
const todo_service_1 = require("../service/todo.service");
const createUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = new models_1.User({
        username: "user1",
        password: "123456",
    });
    const user2 = new models_1.User({
        username: "user2",
        password: "123456",
    });
    yield (0, user_service_1.registerUser)(user);
    yield (0, user_service_1.registerUser)(user2);
});
let todoId;
const createToDo = () => __awaiter(void 0, void 0, void 0, function* () {
    const newTodo = {
        title: "todo1",
        description: "description1",
        username: "user1",
        status: "pending",
        id: "",
    };
    const newToDoResponse = yield (0, todo_service_1.addNewTodo)(newTodo);
    todoId = newToDoResponse.id;
});
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    jest.clearAllMocks();
    (0, db_1.initializeDatabase)();
    yield createUsers();
    yield createToDo();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.User.destroy({
        where: {},
        truncate: true
    });
    yield models_1.Todo.destroy({
        where: {},
        truncate: true
    });
    yield models_1.TodoUser.destroy({
        where: {},
        truncate: true
    });
}));
(0, globals_1.describe)("Todo", () => {
    (0, globals_1.describe)("GET /todos", () => {
        it("should respond with a 200 status code", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).get("/todos/user1");
            (0, globals_1.expect)(response.status).toBe(http_status_1.default.OK);
        }));
    });
    (0, globals_1.describe)("POST /todos", () => {
        it("should respond with a 201 status code", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).post("/todos").send({
                title: "todo2",
                description: "description2",
                status: "pending",
                username: "user1",
            });
            (0, globals_1.expect)(response.status).toBe(http_status_1.default.CREATED);
        }));
    });
    (0, globals_1.describe)("POST /share", () => {
        it("should respond with a 200 status code", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).post("/share").send({
                todoId: todoId,
                username: "user2",
            });
            (0, globals_1.expect)(response.status).toBe(http_status_1.default.OK);
        }));
    });
    (0, globals_1.describe)("PATCH /todos", () => {
        it("should respond with a 200 status code", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).patch("/todos/" + todoId);
            (0, globals_1.expect)(response.status).toBe(http_status_1.default.OK);
        }));
    });
});
