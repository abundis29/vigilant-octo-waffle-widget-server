import express, { Application } from "express";
import { _error } from "../utils/chalk";
import { getApollo } from "./apollo";
import { bootstrap } from "./bootstrap";
import { getServer } from "./server";


export const SERVER = async () => {
    const app: Application = express()
    const apollo = await getApollo()
        .then((server) => {
            server.applyMiddleware({ app, path: "/graphql", cors: true });
        }).catch((error) => {
            _error(error + '🧩 GRAPHQL IS SET TO FALSE')
        })
    const server = await getServer(app)
    const boostrap = bootstrap()
    return { app, server, apollo, boostrap };
}