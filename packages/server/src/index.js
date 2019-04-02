import { getEnv, pipe } from './utils';
import { createConfig } from './config';
import { createProviders } from './providers';
import { getResolvers } from './resolvers';
import { createApiServer } from './apiServer';

const env = getEnv();

const startApp = pipe(
  createConfig,
  createProviders,
  getResolvers,
  createApiServer
);

startApp({ env });
