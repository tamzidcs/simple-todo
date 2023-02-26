"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const models_1 = require("./models");
const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV !== 'test';
const dbInit = () => Promise.all([
    models_1.Task.sync({ alter: isDev || isTest }),
]);
exports.default = dbInit;
