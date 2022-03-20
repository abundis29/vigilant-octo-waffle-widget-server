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
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const User_1 = require("../orm/entity/User");
const userRoutes = (0, express_1.Router)();
userRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, typeorm_1.getRepository)(User_1.User).find();
    console.log(users);
    res.json(users);
}));
userRoutes.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, typeorm_1.getRepository)(User_1.User).findOne(req.params.id);
    console.log(users);
    res.json(users);
}));
userRoutes.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, typeorm_1.getRepository)(User_1.User).findOne(req.params.id);
    if (!user)
        return;
    (0, typeorm_1.getRepository)(User_1.User).merge(user, req.body);
    const results = yield (0, typeorm_1.getRepository)(User_1.User).save(user);
    return res.send(results);
}));
userRoutes.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield (0, typeorm_1.getRepository)(User_1.User).delete(req.params.id);
    return res.send(results);
}));
userRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, typeorm_1.getRepository)(User_1.User).create(req.body);
    const results = yield (0, typeorm_1.getRepository)(User_1.User).save(user);
    return res.send(results);
}));
exports.default = userRoutes;
