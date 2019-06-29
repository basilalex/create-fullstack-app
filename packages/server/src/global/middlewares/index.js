import { security } from './security';
import { json } from './json';
import { cors } from './cors';
import { serveStatic } from './serveStatic';
import { graphql } from './graphql';
import { playground } from './playground';

export const middlewares = [
  security,
  json,
  cors,
  serveStatic,
  graphql,
  playground,
];
