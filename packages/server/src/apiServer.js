import path from 'path';
import cors from 'cors';
import express from 'express';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import expressPlayground from 'graphql-playground-middleware-express';
import typeDefs from './schema.graphql';

export const createApiServer = appCtx => {
  const { resolvers, DAO, env: { WEBSITE_URL, PORT }} = appCtx;
  const app = express();
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const apolloServer = new ApolloServer({
    schema,
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

  app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

  if (process.env.NODE_ENV === 'development') {
    app.get('*', (req, res) => res.redirect(WEBSITE_URL));
  }

  app.listen(PORT || 8080, () => {
    console.log(`The application is running on port ${PORT || 8080}`);
  });

  return { ...appCtx, app };
};
