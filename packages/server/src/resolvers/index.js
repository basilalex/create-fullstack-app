import { Query } from './Query';
import { Mutation } from './Mutation';
import { Subscription } from './subscription';

export const getResolvers = appCtx => ({ ...appCtx, resolvers: { Query, Mutation, Subscription }});
