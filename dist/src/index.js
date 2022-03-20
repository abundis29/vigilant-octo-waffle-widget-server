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
exports.app = void 0;
require('dotenv').config();
require("reflect-metadata");
const express_1 = require("./config/express");
const chalk_1 = require("./utils/chalk");
const logo_1 = require("./utils/logo");
(0, chalk_1.info)(logo_1.logo);
const app = () => __awaiter(void 0, void 0, void 0, function* () { return (0, express_1.SERVER)(); });
exports.app = app;
(0, exports.app)().catch((error) => (0, chalk_1._error)(error));
