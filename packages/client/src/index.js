import { pipe } from './utils';
import { createProviders } from './providers';
import { getRoutes } from './routes';
import { renderApp } from './root';
import { configureSW } from './SW';

const startApp = pipe(
  createProviders,
  getRoutes,
  renderApp,
  configureSW
);

startApp({});
