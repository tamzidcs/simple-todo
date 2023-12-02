"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shareTodo = exports.updateTodoStatus = exports.getAllTodosByUsername = exports.addNewTodo = void 0;
const todoService = __importStar(require("../service/todo.service"));
const http_status_1 = require("http-status");
function addNewTodo(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const todo = req.body;
        try {
            const result = yield todoService.addNewTodo(todo);
            res.status(http_status_1.CREATED).send(result);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.addNewTodo = addNewTodo;
function getAllTodosByUsername(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.params;
            const data = yield todoService.getAllTodos(user.username);
            res.send(data);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getAllTodosByUsername = getAllTodosByUsername;
function updateTodoStatus(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const todoId = req.params.todoId;
        try {
            const data = yield todoService.updateTodoStatus(todoId);
            res.send(data);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateTodoStatus = updateTodoStatus;
function shareTodo(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const newTodoUser = req.body;
        try {
            const result = yield todoService.shareTodo(newTodoUser);
            res.send(result);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.shareTodo = shareTodo;
