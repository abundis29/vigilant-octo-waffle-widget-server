import { Resolver, Query, Mutation, Arg, UseMiddleware, Ctx } from "type-graphql";
import { isAdmin, isAuth } from "../../middlewares/policies";
import { User } from "../../orm/entity/User";
import { AppContext } from "../inputs/AppContext";
import { CreateUserInput } from "../inputs/User";


@Resolver()
export class UserResolver {
    @Query(() => [User])
    @UseMiddleware(isAuth)
    @UseMiddleware(isAdmin)
    async users(@Ctx() ctx: AppContext) {
        // console.log(ctx, "MOMO")
        return User.find()
    }
    @Query(() => [User])
    @UseMiddleware(isAuth)
    async user(@Arg("id") id: string, @Ctx() ctx: AppContext) {
        if (id) {
            const user = await User.findOne({ where: { id } });
            return user
        }
        return User.find()
    }

    @Mutation(() => User)
    async updateUser(@Arg("id") id: string, @Arg("data") data: CreateUserInput) {
        const user = await User.findOne({ where: { id } });
        if (!user) throw new Error("User not found!");
        Object.assign(user, data);
        await user.save();
        return user;
    }

    @Mutation(() => Boolean)
    async deleteUser(@Arg("id") id: string) {
        const user = await User.findOne({ where: { id } });
        if (!user) throw new Error("User not found!");
        await user.softRemove();
        return true;
    }
}

