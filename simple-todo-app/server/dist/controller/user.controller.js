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
exports.getAllUsers = exports.loginUser = exports.registerUser = void 0;
const userService = __importStar(require("../service/user.service"));
const http_status_1 = require("http-status");
function registerUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        try {
            const result = yield userService.registerUser(user);
            const resp = { message: result.message, username: result.username };
            res.status(result.statusCode).send(resp);
        }
        catch (error) {
            res.status(http_status_1.INTERNAL_SERVER_ERROR).json({
                username: user.username,
            });
            next(error);
        }
    });
}
exports.registerUser = registerUser;
function loginUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        try {
            const loginResponse = yield userService.loginUser(user);
            if (loginResponse) {
                res.status(loginResponse.statusCode).json({
                    message: loginResponse === null || loginResponse === void 0 ? void 0 : loginResponse.message,
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
exports.loginUser = loginUser;
function getAllUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.params.username;
        try {
            const result = yield userService.getAllUsers();
            res.send(result);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getAllUsers = getAllUsers;
