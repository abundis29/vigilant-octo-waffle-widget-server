"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FACEBOOK_STRATEGY = exports.FACEBOOK_APP_ID = exports.FACEBOOK_APP_SECRET = exports.SECRET = void 0;
exports.SECRET = '@jpfh6anrhh80)#w-g8j*%_#0nx@2)0$z*cp0)+0seu*nyt-e4';
exports.FACEBOOK_APP_SECRET = '549e955b62697a813ff461a62c13990b';
exports.FACEBOOK_APP_ID = '275431916762864';
exports.FACEBOOK_STRATEGY = {
    clientID: exports.FACEBOOK_APP_ID,
    clientSecret: exports.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:4000/auth/facebook/callback"
};
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JWT_STRATEGY_CONFIG = {
    secretOrKey: exports.SECRET,
    jwtFromRequest: ExtractJwt.versionOneCompatibility({
        authScheme: 'Bearer',
        tokenBodyField: 'access_token'
    }),
    tokenQueryParameterName: 'access_token',
    session: false,
    passReqToCallback: true
};
