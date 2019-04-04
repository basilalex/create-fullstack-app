import path from 'path';
import cors from 'cors';
import { createServer } from 'http';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import expressPlayground from 'graphql-playground-middleware-express';
import typeDefs from './schema.graphql';

export const createApiServer = appCtx => {
  const { resolvers, DAO, env: { WEBSITE_URL, PORT }} = appCtx;
  const app = express();
  const ws = createServer(app);
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    subscriptions: '/subscriptions',
    context: ({ req }) => ({ ...req, DAO })
  });

  app.use(cors({
    credentials: true,
    origin: WEBSITE_URL
  }));

  app.use(express.json());

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(process.cwd(), '../client/build')));    
  }

  apolloServer.applyMiddleware({ app, path: '/graphql' });
  apolloServer.installSubscriptionHandlers(ws);

  if (process.env.NODE_ENV === 'development') {
    app.get('/playground', expressPlayground({
      endpoint: '/graphql',
      subscriptionsEndpoint: '/subscriptions'
    }));
  }

  ws.listen(PORT || 8080, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT || 8080}${apolloServer.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT || 8080}${apolloServer.subscriptionsPath}`)
  });

  return { ...appCtx, app };
};
