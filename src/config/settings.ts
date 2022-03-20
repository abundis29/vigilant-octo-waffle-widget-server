import { security } from "./cors";

// tslint:disable-next-line:no-var-requires
// export const models = require('../api/entity')
export const CORS = security.cors
export const PORT = 4000;
export const GRAPHQL = true
export const GRAPHQL_PLAYGROUND = true
export const USE_COMPRESSION = true
export const jwtExpiration = process.env.jwtExpiration || '1d'
export const jwtRefreshExpiration = process.env.jwtRefreshExpiration || '10d'
export const PRODUCTION = process.env.NODE_ENV === 'production'
export const hasSession = false
export const USE_SECURITY = false



