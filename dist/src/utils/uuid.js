"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignId = void 0;
const uuid_1 = require("uuid");
const assignId = (req, _res, next) => {
    req.id = (0, uuid_1.v4)();
    next();
};
exports.assignId = assignId;
