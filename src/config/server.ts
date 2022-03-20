import compression from 'compression';
import connectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import express, { Application } from 'express';
import session from 'express-session';
import { createServer } from 'http';
import morgan from 'morgan';

import { v4 as uuidv4 } from 'uuid';
import { info } from '../utils/chalk';
import { cookie } from './cookies';
import { SECRET } from './session';
import { USE_COMPRESSION, PORT, PRODUCTION, hasSession, USE_SECURITY } from './settings';
import { Connection } from 'typeorm';
import cors from 'cors';
import flash from 'connect-flash'
import { security } from './cors';

const RedisStore = connectRedis(session)
const redis = require('redis')


export const getServer = async (app: Application) => {
    let server = app
    if (USE_SECURITY) {
        const corsOptions = {
            origin: function (origin: string, callback: Function) {
                // var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
                callback(null, true);
            },
            credentials: true
        };
        //@ts-ignore
        server.options('*', cors(security.cors))
    }

    if (hasSession) {
        const redisClient = redis.createClient();
        server.use(session({
            resave: false,
            saveUninitialized: false,
            name: "qid",
            secret: process.env.SESSION_SECRET || SECRET,
            genid: function (req) {
                return uuidv4();
            },
            cookie: {
                httpOnly: true,
                secure: PRODUCTION,
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
            },
            store: new RedisStore({
                client: redisClient,
                host: '127.0.0.1',
                port: 6379
            })
        }))
    }

    server.use(express.urlencoded({
        extended: true
    }))

    server.use(express.json());
    server.use(flash())
    server.use(morgan('dev'))

    if (cookie.enable) {
        app.use(cookieParser())
        info("🍪 Enabled")
        app.use(cookieSession(cookie))
        info("🍪 Session Created")
    }
    if (USE_COMPRESSION) {
        app.use(compression())
        info("🚀 Compression is on ")
    }

    const httpServer = createServer(server);

    await httpServer.listen({ port: PORT }, (): void =>
        info("🚀 [DEVELOPMENT] Server ready at http://localhost:" + PORT)
    );

    return httpServer
}
