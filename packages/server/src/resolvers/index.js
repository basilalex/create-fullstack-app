import { Query } from './Query';
import { Mutation } from './Mutation';

export const getResolvers = appCtx => ({ ...appCtx, resolvers: { Query, Mutation }});
