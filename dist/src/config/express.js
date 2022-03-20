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
exports.SERVER = void 0;
const express_1 = __importDefault(require("express"));
const chalk_1 = require("../utils/chalk");
const apollo_1 = require("./apollo");
const bootstrap_1 = require("./bootstrap");
const server_1 = require("./server");
const SERVER = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const apollo = yield (0, apollo_1.getApollo)()
        .then((server) => {
        server.applyMiddleware({ app, path: "/graphql", cors: true });
    }).catch((error) => {
        (0, chalk_1._error)(error + '🧩 GRAPHQL IS SET TO FALSE');
    });
    const server = yield (0, server_1.getServer)(app);
    const boostrap = (0, bootstrap_1.bootstrap)();
    return { app, server, apollo, boostrap };
});
exports.SERVER = SERVER;
