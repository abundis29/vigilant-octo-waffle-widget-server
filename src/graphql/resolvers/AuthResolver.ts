import jwt from 'jsonwebtoken'
import { Resolver, Mutation, Arg, Ctx, Query } from "type-graphql";
import { SECRET } from "../../config/session";
import { User } from "../../orm/entity/User";
import { _error, info } from "../../utils/chalk";
import { hashPassword } from "../../utils/hasPassword";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import { AppContext } from "../inputs/AppContext";
import { AuthInput } from "../inputs/AuthInput";
import { JWTInput } from "../inputs/JwtContext";
import { UserJwtResponse, UserResponse } from '../inputs/User';


declare module 'express-session' {
    interface Session {
        userId: number
    }
}

export const invalidLoginResponse = {
    errors: [
        {
            path: "email",
            message: "invalid login"
        }
    ]
};

@Resolver()
export class AuthResolver {
    @Mutation(() => UserResponse)
    async register(
        @Arg("input")
        { email, password }: AuthInput
    ): Promise<UserResponse> {
        const hashedPassword = await hashPassword(password)
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return {
                errors: [
                    {
                        path: "email",
                        message: "already in use"
                    }
                ]
            };
        }

        const newUser = new User()
        newUser.fullName = ''
        newUser.username = ''
        newUser.email = email
        newUser.setPassword(hashedPassword)
        const user = await User.create(newUser)
        const token = await generateAccessToken(user.id)
        const refreshToken = await generateRefreshToken(user.id)
        user.setToken(token)
        user.setRefreshToken(refreshToken)
        user.save();
        return { user };
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("input") { email, password }: AuthInput,
        @Ctx() ctx: AppContext
    ): Promise<UserResponse> {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return invalidLoginResponse;
        }
        ctx.user = user;
        const passwordIsCorrect = await user.validatePassword(password)
        if (!passwordIsCorrect) {
            return invalidLoginResponse;
        }
        jwt.verify(user.token, SECRET as string, async (err: any, exp: any) => {
            if (err) {
                _error(err)
                _error('invalid token')
                user.setToken(await generateAccessToken(user.id))
                user.save()

            }
            info('valid token')
        })
        console.log(ctx.req.session)
        // ctx.req.session.userId = 1
        //@ts-ignore
        ctx.req.user = user
        return { user };
    }

    @Mutation(() => UserJwtResponse)
    async SocialAuth(
        @Arg("input") { token, type }: JWTInput,
        @Ctx() ctx: AppContext
    ): Promise<null> {
        info(token)
        info(type)
        return null
    }

    @Query(() => User, { nullable: true })
    async me(@Ctx() ctx: AppContext): Promise<User | undefined> {
        if (!ctx.req.session!.userId) {
            return undefined;
        }
        return User.findOne(ctx.req.session!.userId);
    }

    @Mutation(() => Boolean)
    async logout(@Ctx() ctx: AppContext): Promise<Boolean> {
        return new Promise((res, rej) =>
            ctx.req.session!.destroy(err => {
                if (err) {
                    console.log(err);
                    return rej(false);
                }
                ctx.res.clearCookie("qid");
                return res(true);
            })
        );
    }
}
