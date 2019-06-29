import { gql } from 'apollo-server-express';

export const mergeResolvers = (...args) => {
  const Query = args.reduce((acc, { query }) => query ? ({ ...acc, ...query }) : acc, {});
  const Mutation = args.reduce((acc, { mutation }) => mutation ? ({ ...acc, ...mutation }) : acc, {});
  const Subscription = args.reduce((acc, { subscription }) => subscription ? ({ ...acc, ...subscription }) : acc, {});
  const typeDefs = args.reduce((acc, { typeDefs }) => typeDefs ? ([ ...acc, gql(typeDefs) ]) : acc, []);

  return { resolvers: { Query, Mutation, Subscription }, typeDefs };
};
