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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../db/models/User"));
const bcrypt = __importStar(require("bcrypt"));
const http_status_1 = require("http-status");
const incorrectUserNamePasswordMessage = "Incorrect username or password.";
const loginSuccessfullMessage = "Login successfull.";
const userAlreadyExistMessage = "User already exists";
const userCreatedMessage = "User created.";
const registrationFailed = "User registration failed.";
function createNewUser(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = new User_1.default({
            username: username,
            password: password,
        });
        const existingUser = yield User_1.default.findOne({ where: { username: username } });
        if (existingUser) {
            return { userCreated: false, message: userAlreadyExistMessage };
        }
        else {
            try {
                yield user.save();
                return { userCreated: true, message: userCreatedMessage };
            }
            catch (error) {
                return { userCreated: false, message: error };
            }
        }
    });
}
function validatePassord(userPassword, loginPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const valid = yield bcrypt.compare(loginPassword, userPassword);
        return valid;
    });
}
function registerUser(newUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const saltOrRounds = 10;
        const hashedPassword = yield bcrypt.hash(newUser.password, saltOrRounds);
        try {
            const result = yield createNewUser(newUser.username, hashedPassword);
            if (result.userCreated) {
                return {
                    statusCode: http_status_1.CREATED,
                    message: userCreatedMessage,
                    username: newUser.username,
                };
            }
            else if (result.message === userAlreadyExistMessage) {
                return {
                    statusCode: http_status_1.CONFLICT,
                    message: userAlreadyExistMessage,
                    username: newUser.username,
                };
            }
            else {
                return {
                    statusCode: http_status_1.INTERNAL_SERVER_ERROR,
                    message: registrationFailed,
                    username: newUser.username,
                };
            }
        }
        catch (error) {
            return {
                statusCode: http_status_1.INTERNAL_SERVER_ERROR,
                message: registrationFailed,
                username: newUser.username,
            };
        }
    });
}
exports.registerUser = registerUser;
function loginUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkUser = yield User_1.default.findOne({ where: { username: user.username } });
        if (!checkUser) {
            return {
                statusCode: http_status_1.UNAUTHORIZED,
                message: incorrectUserNamePasswordMessage,
            };
        }
        else if (checkUser !== null) {
            const valid = yield validatePassord(checkUser.password, user.password);
            if (valid) {
                return { statusCode: http_status_1.OK, message: loginSuccessfullMessage };
            }
        }
        return {
            statusCode: http_status_1.UNAUTHORIZED,
            message: incorrectUserNamePasswordMessage,
        };
    });
}
exports.loginUser = loginUser;
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield User_1.default.findAll();
        return users;
    });
}
exports.getAllUsers = getAllUsers;
