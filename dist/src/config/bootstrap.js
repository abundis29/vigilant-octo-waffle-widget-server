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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const chalk_1 = require("../utils/chalk");
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if ((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.includes('development')) {
        (0, chalk_1.debbug)(' BOOSTRAP INIT');
    }
});
exports.bootstrap = bootstrap;
