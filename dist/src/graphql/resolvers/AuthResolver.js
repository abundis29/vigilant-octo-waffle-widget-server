"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.AuthResolver = exports.invalidLoginResponse = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const type_graphql_1 = require("type-graphql");
const session_1 = require("../../config/session");
const User_1 = require("../../orm/entity/User");
const chalk_1 = require("../../utils/chalk");
const hasPassword_1 = require("../../utils/hasPassword");
const jwt_1 = require("../../utils/jwt");
const AuthInput_1 = require("../inputs/AuthInput");
const JwtContext_1 = require("../inputs/JwtContext");
const User_2 = require("../inputs/User");
exports.invalidLoginResponse = {
    errors: [
        {
            path: "email",
            message: "invalid login"
        }
    ]
};
let AuthResolver = class AuthResolver {
    register({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield (0, hasPassword_1.hashPassword)(password);
            const existingUser = yield User_1.User.findOne({ email });
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
            const newUser = new User_1.User();
            newUser.fullName = '';
            newUser.username = '';
            newUser.email = email;
            newUser.setPassword(hashedPassword);
            const user = yield User_1.User.create(newUser);
            const token = yield (0, jwt_1.generateAccessToken)(user.id);
            const refreshToken = yield (0, jwt_1.generateRefreshToken)(user.id);
            user.setToken(token);
            user.setRefreshToken(refreshToken);
            user.save();
            return { user };
        });
    }
    login({ email, password }, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { email } });
            if (!user) {
                return exports.invalidLoginResponse;
            }
            ctx.user = user;
            const passwordIsCorrect = yield user.validatePassword(password);
            if (!passwordIsCorrect) {
                return exports.invalidLoginResponse;
            }
            jsonwebtoken_1.default.verify(user.token, session_1.SECRET, (err, exp) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    (0, chalk_1._error)(err);
                    (0, chalk_1._error)('invalid token');
                    user.setToken(yield (0, jwt_1.generateAccessToken)(user.id));
                    user.save();
                }
                (0, chalk_1.info)('valid token');
            }));
            console.log(ctx.req.session);
            ctx.req.user = user;
            return { user };
        });
    }
    SocialAuth({ token, type }, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, chalk_1.info)(token);
            (0, chalk_1.info)(type);
            return null;
        });
    }
    me(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ctx.req.session.userId) {
                return undefined;
            }
            return User_1.User.findOne(ctx.req.session.userId);
        });
    }
    logout(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => ctx.req.session.destroy(err => {
                if (err) {
                    console.log(err);
                    return rej(false);
                }
                ctx.res.clearCookie("qid");
                return res(true);
            }));
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => User_2.UserResponse),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthInput_1.AuthInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_2.UserResponse),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthInput_1.AuthInput, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_2.UserJwtResponse),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [JwtContext_1.JWTInput, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "SocialAuth", null);
__decorate([
    (0, type_graphql_1.Query)(() => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "logout", null);
AuthResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], AuthResolver);
exports.AuthResolver = AuthResolver;
