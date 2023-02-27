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
exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../db/models/User"));
function registerUser(newUser) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("new user", newUser);
        const user = yield User_1.default.create({
            id: newUser.id,
            username: newUser.username,
            password: newUser.password,
        });
        if (user) {
            return {
                id: user.id,
                username: user.username
            };
        }
        else {
            console.log('Registration failed.');
        }
    });
}
exports.registerUser = registerUser;
function loginUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("user", user);
        const checkUser = yield User_1.default.findOne({ where: { username: "usr1" } });
        if (!checkUser) {
            return { username: checkUser };
        }
        else {
            if (user.password === checkUser.password) {
                return { username: checkUser === null || checkUser === void 0 ? void 0 : checkUser.username };
            }
            else {
                return null;
            }
        }
        return null;
    });
}
exports.loginUser = loginUser;
