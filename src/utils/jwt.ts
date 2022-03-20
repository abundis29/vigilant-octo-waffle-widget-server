import { ApolloError } from 'apollo-server-express';
import jwt from 'jsonwebtoken'
import { SECRET } from '../config/session';
import { jwtExpiration, jwtRefreshExpiration } from '../config/settings';
import { info } from './chalk';


export const generateAccessToken = async (id: any) => {
    // info('Token => : ' + jwtExpiration)
    return jwt.sign({
        id
    }, SECRET, { expiresIn: jwtExpiration, algorithm: 'HS256' });
}
export const generateRefreshToken = async (id: any) => {
    // info('RefreshToken => : ' + jwtRefreshExpiration)
    return jwt.sign({
        id
    }, SECRET, { expiresIn: jwtRefreshExpiration, algorithm: 'HS256' });
}