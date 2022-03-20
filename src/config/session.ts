export const SECRET = '@jpfh6anrhh80)#w-g8j*%_#0nx@2)0$z*cp0)+0seu*nyt-e4';
export const FACEBOOK_APP_SECRET = '549e955b62697a813ff461a62c13990b'
export const FACEBOOK_APP_ID = '275431916762864'

export const FACEBOOK_STRATEGY = {
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:4000/auth/facebook/callback"
}

const ExtractJwt = require('passport-jwt').ExtractJwt;

const JWT_STRATEGY_CONFIG = {
    secretOrKey: SECRET,
    jwtFromRequest: ExtractJwt.versionOneCompatibility({
        authScheme: 'Bearer',
        tokenBodyField: 'access_token'
    }),
    tokenQueryParameterName: 'access_token',
    session: false,
    passReqToCallback: true
};