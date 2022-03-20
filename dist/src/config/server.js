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
exports.getServer = void 0;
const compression_1 = __importDefault(require("compression"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const http_1 = require("http");
const morgan_1 = __importDefault(require("morgan"));
const uuid_1 = require("uuid");
const chalk_1 = require("../utils/chalk");
const cookies_1 = require("./cookies");
const session_1 = require("./session");
const settings_1 = require("./settings");
const cors_1 = __importDefault(require("cors"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const cors_2 = require("./cors");
const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
const redis = require('redis');
const getServer = (app) => __awaiter(void 0, void 0, void 0, function* () {
    let server = app;
    if (settings_1.USE_SECURITY) {
        const corsOptions = {
            origin: function (origin, callback) {
                callback(null, true);
            },
            credentials: true
        };
        server.options('*', (0, cors_1.default)(cors_2.security.cors));
    }
    if (settings_1.hasSession) {
        const redisClient = redis.createClient();
        server.use((0, express_session_1.default)({
            resave: false,
            saveUninitialized: false,
            name: "qid",
            secret: process.env.SESSION_SECRET || session_1.SECRET,
            genid: function (req) {
                return (0, uuid_1.v4)();
            },
            cookie: {
                httpOnly: true,
                secure: settings_1.PRODUCTION,
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365
            },
            store: new RedisStore({
                client: redisClient,
                host: '127.0.0.1',
                port: 6379
            })
        }));
    }
    server.use(express_1.default.urlencoded({
        extended: true
    }));
    server.use(express_1.default.json());
    server.use((0, connect_flash_1.default)());
    server.use((0, morgan_1.default)('dev'));
    if (cookies_1.cookie.enable) {
        app.use((0, cookie_parser_1.default)());
        (0, chalk_1.info)("🍪 Enabled");
        app.use((0, cookie_session_1.default)(cookies_1.cookie));
        (0, chalk_1.info)("🍪 Session Created");
    }
    if (settings_1.USE_COMPRESSION) {
        app.use((0, compression_1.default)());
        (0, chalk_1.info)("🚀 Compression is on ");
    }
    const httpServer = (0, http_1.createServer)(server);
    yield httpServer.listen({ port: settings_1.PORT }, () => (0, chalk_1.info)("🚀 [DEVELOPMENT] Server ready at http://localhost:" + settings_1.PORT));
    return httpServer;
});
exports.getServer = getServer;
