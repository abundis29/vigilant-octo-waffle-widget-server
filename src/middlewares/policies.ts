
import { ApolloError } from 'apollo-server-express';
import { info } from 'console';
import jwt from 'jsonwebtoken'
import { MiddlewareFn } from 'type-graphql';
import { SECRET } from '../config/session';
import { AppContext } from '../graphql/inputs/AppContext';
import { User } from '../orm/entity/User';
import Role from '../orm/types/roles.enum';
import { log, _error } from '../utils/chalk';


export const isAuth: MiddlewareFn<AppContext> = async ({ context }, next) => {
  const { req, res } = context
  const authHeader = req.get('authorization')
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) throw new ApolloError("not authenticated token");
  jwt.verify(token, SECRET as string, (err: any, user: any) => {
    if (err) _error(err)
    if (err) throw new ApolloError(err);
  })
  return next()
};

export const isAdmin: MiddlewareFn<AppContext> = async ({ context }, next) => {
  const { req, res } = context
  const authHeader = req.get('authorization')
  const token = authHeader && authHeader.split(' ')[1]
  const user = await User.findOne({ where: { token } });
  if (token == null) throw new ApolloError("not authenticated token");
  jwt.verify(token, SECRET as string, (err: any, user: any) => {
    if (err) _error(err)
    if (err) throw new ApolloError(err);
  })
  if(!user) throw new ApolloError('only Admin menester 1');
  const {role} = user
  if(!role.includes(Role.Admin)) throw new ApolloError('only Admin menester 2');
  return next()
};

export const isExpired = (token: string) => {
  jwt.verify(token, SECRET as string, (err: any, user: any) => {
    if (err) {
      _error(err)
      return true
    }
    return false
  })
  return false
}
