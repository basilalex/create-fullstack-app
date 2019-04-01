import path from 'path';
import dotenv from 'dotenv';
import { createApiServer } from './apiServer';
import { pipe } from './utils';

const env = dotenv.config({ path: path.join(process.cwd() + '/.env.development') });

const startApp = pipe(
  createApiServer
);

startApp();
