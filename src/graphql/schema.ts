import "graphql-import-node";
import * as typeDefs from "./schema/schema.graphql";
import { makeExecutableSchema } from "graphql-tools";
import { GraphQLSchema } from "graphql";
import { resolvers } from "./resolvers";

const _schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
export default _schema;