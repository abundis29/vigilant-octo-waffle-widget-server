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
exports.isExpired = exports.isAdmin = exports.isAuth = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const session_1 = require("../config/session");
const User_1 = require("../orm/entity/User");
const roles_enum_1 = __importDefault(require("../orm/types/roles.enum"));
const chalk_1 = require("../utils/chalk");
const isAuth = ({ context }, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { req, res } = context;
    const authHeader = req.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        throw new apollo_server_express_1.ApolloError("not authenticated token");
    jsonwebtoken_1.default.verify(token, session_1.SECRET, (err, user) => {
        if (err)
            (0, chalk_1._error)(err);
        if (err)
            throw new apollo_server_express_1.ApolloError(err);
    });
    return next();
});
exports.isAuth = isAuth;
const isAdmin = ({ context }, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { req, res } = context;
    const authHeader = req.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];
    const user = yield User_1.User.findOne({ where: { token } });
    if (token == null)
        throw new apollo_server_express_1.ApolloError("not authenticated token");
    jsonwebtoken_1.default.verify(token, session_1.SECRET, (err, user) => {
        if (err)
            (0, chalk_1._error)(err);
        if (err)
            throw new apollo_server_express_1.ApolloError(err);
    });
    if (!user)
        throw new apollo_server_express_1.ApolloError('only Admin menester 1');
    const { role } = user;
    if (!role.includes(roles_enum_1.default.Admin))
        throw new apollo_server_express_1.ApolloError('only Admin menester 2');
    return next();
});
exports.isAdmin = isAdmin;
const isExpired = (token) => {
    jsonwebtoken_1.default.verify(token, session_1.SECRET, (err, user) => {
        if (err) {
            (0, chalk_1._error)(err);
            return true;
        }
        return false;
    });
    return false;
};
exports.isExpired = isExpired;
