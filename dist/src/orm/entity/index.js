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
exports.closeConnection = exports.clearConnection = exports.getConnection = exports.connection = void 0;
const typeorm_1 = require("typeorm");
const chalk_1 = require("../../utils/chalk");
const getConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, chalk_1.info)(process.env.NODE_ENV);
    const options = yield (0, typeorm_1.getConnectionOptions)(process.env.NODE_ENV || "development");
    if (!exports.connection || !exports.connection.isConnected) {
        exports.connection = yield (0, typeorm_1.createConnection)(Object.assign(Object.assign({}, options), { name: "default" }));
    }
    return exports.connection;
});
exports.getConnection = getConnection;
const clearConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    const entities = exports.connection.entityMetadatas;
    entities.forEach((entity) => __awaiter(void 0, void 0, void 0, function* () {
        const repository = exports.connection.getRepository(entity.name);
        yield repository.query(`DELETE FROM ${entity.tableName}`);
    }));
});
exports.clearConnection = clearConnection;
const closeConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    (yield exports.connection) && exports.connection.isConnected && exports.connection.close();
});
exports.closeConnection = closeConnection;
