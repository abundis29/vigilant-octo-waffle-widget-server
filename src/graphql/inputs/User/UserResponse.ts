import { ObjectType, Field } from "type-graphql";
import { User } from "../../../orm/entity/User";
import { FieldError } from "../FieldError";



@ObjectType()
export class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@ObjectType()
export class UserJwtResponse {
  @Field()
  token?: string;
  @Field()
  type?: string;
}
