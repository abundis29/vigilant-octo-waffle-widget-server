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
exports.getApollo = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const AuthResolver_1 = require("../graphql/resolvers/AuthResolver");
const UserResolver_1 = require("../graphql/resolvers/UserResolver");
const chalk_1 = require("../utils/chalk");
const settings_1 = require("./settings");
const getApollo = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!settings_1.GRAPHQL)
        throw new Error('error');
    const schema = yield (0, type_graphql_1.buildSchema)({
        resolvers: [UserResolver_1.UserResolver, AuthResolver_1.AuthResolver]
    });
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res }),
        playground: {
            settings: {
                "request.credentials": "include"
            }
        }
    });
    yield server.start();
    if (settings_1.GRAPHQL_PLAYGROUND) {
        (0, chalk_1.info)('🚀 PLAYGROUND available on http://localhost:4000/graphql');
    }
    (0, chalk_1.info)("🚀 Apollo server on http://localhost:" + settings_1.PORT + '/graphql');
    (0, chalk_1.info)("🚀 Explore at https://studio.apollographql.com/sandbox");
    return server;
});
exports.getApollo = getApollo;
