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
exports.getAllUsers = exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../db/models/User"));
function registerUser(newUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = new User_1.default();
        user.username = newUser.username;
        user.password = newUser.password;
        user.save();
        return user;
    });
}
exports.registerUser = registerUser;
function loginUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkUser = yield User_1.default.findOne({ where: { username: user.username } });
        if (!checkUser) {
            return null;
        }
        else if (checkUser !== null) {
            if (user.password === checkUser.password) {
                return { username: checkUser === null || checkUser === void 0 ? void 0 : checkUser.username };
            }
            return { username: user.username };
        }
        return null;
    });
}
exports.loginUser = loginUser;
function getAllUsers(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield User_1.default.findAll();
        return users;
    });
}
exports.getAllUsers = getAllUsers;
