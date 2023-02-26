"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const models_1 = require("./models");
const create = (payload) => {
    return models_1.Task.create(payload);
};
exports.create = create;
