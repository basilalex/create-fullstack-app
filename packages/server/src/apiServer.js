import path from 'path';
import cors from 'cors';
import express from 'express';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import expressPlayground from 'graphql-playground-middleware-express';
import resolvers from './resolvers';
import typeDefs from './schema.graphql';
import { db } from './config';

export const createApiServer = args => {
  const app = express();
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => ({ ...req, db })
  });

  app.use(cors({
    credentials: true,
    origin: process.env.WEBSITE_URL
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

  app.listen(process.env.PORT || 8080, () => {
    console.log(`The application is running on port ${process.env.PORT || 8080}`);
  });

  return { ...args, app };
};
