"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debbug = exports._error = exports.info = exports.warning = exports.cyan = exports._warning = exports.error = exports.log = void 0;
const chalk_1 = __importDefault(require("chalk"));
exports.log = console.log;
exports.error = chalk_1.default.bold.red;
exports._warning = chalk_1.default.keyword("orange");
exports.cyan = chalk_1.default.keyword("blue");
const warning = (...data) => (0, exports.log)(`[WARN]: ${(0, exports._warning)(...data)} `);
exports.warning = warning;
const info = (...data) => (0, exports.log)(`[INFO]: ${chalk_1.default.cyan(...data)} `);
exports.info = info;
const _error = (...data) => (0, exports.log)(`[ERROR]: ${chalk_1.default.red(...data)} `);
exports._error = _error;
const debbug = (...data) => (0, exports.log)(`[DEBUG]: ${chalk_1.default.green(...data)} `);
exports.debbug = debbug;
