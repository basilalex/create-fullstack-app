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
  // app.use(express.static(path.join(__dirname, '../client/dist')));

  // app.get('*', (req, res) => {
  //   res.sendFile('index.html', { root: path.join(__dirname, '../client/dist') });
  // });

  apolloServer.applyMiddleware({ app, path: '/graphql' });

  app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

  app.get('*', (req, res) => {
    return res.send('Bye Bye World');
  });

  app.listen(PORT || 8080, () => {
    console.log(`The application is running on port ${PORT || 8080}`);
  });

  return { ...appCtx, app };
};
