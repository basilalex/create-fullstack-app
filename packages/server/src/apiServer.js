import express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { env, middlewares } from './global';
import types from './types';

const { resolvers, typeDefs } = types;

export const createApiServer = () => {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    subscriptions: '/subscriptions',
    // context: ({ req }) => ({ req })
  });

  middlewares.forEach(fn => fn({ app, apolloServer }));

  const ws = createServer(app);
  apolloServer.installSubscriptionHandlers(ws);

  return ws.listen(env.PORT || 8080, () => {
    console.log(`🚀 Server ready at http://localhost:${env.PORT || 8080}${apolloServer.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${env.PORT || 8080}${apolloServer.subscriptionsPath}`)
  });
};

export default createApiServer;
