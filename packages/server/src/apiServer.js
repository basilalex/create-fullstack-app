import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import expressPlayground from 'graphql-playground-middleware-express';
import typeDefs from './schema.graphql';

export const createApiServer = appCtx => {
  const { cspConfig, featureConfig, resolvers, DAO, env: { WEBSITE_URL, PORT }} = appCtx;
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    subscriptions: '/subscriptions',
    context: ({ req }) => ({ ...req, DAO })
  });

  app.use(helmet());

  if (process.env.NODE_ENV === 'production') {
    app.use(helmet.contentSecurityPolicy(cspConfig));
    app.use(helmet.featurePolicy(featureConfig));
  }

  app.use(express.json());

  app.use(cors({
    credentials: true,
    origin: WEBSITE_URL,
    optionsSuccessStatus: 200,
    methods: 'GET,POST',
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(process.cwd(), '../client/build')));    
  }

  apolloServer.applyMiddleware({ app, path: '/graphql' });

  if (process.env.NODE_ENV === 'development') {
    app.get('/playground', expressPlayground({
      endpoint: '/graphql',
      subscriptionsEndpoint: '/subscriptions'
    }));
  }

  const ws = createServer(app);
  apolloServer.installSubscriptionHandlers(ws);

  ws.listen(PORT || 8080, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT || 8080}${apolloServer.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT || 8080}${apolloServer.subscriptionsPath}`)
  });

  return { ...appCtx, app, ws };
};
