import { pipe } from './utils';
import { createProviders } from './providers';
import { getUI } from './UI';
import { getComponents } from './components';
import { getRoutes } from './routes';
import { renderApp } from './root';
import { configureSW } from './SW';

const startApp = pipe(
  createProviders,
  getUI,
  getComponents,
  getRoutes,
  renderApp,
  configureSW
);

startApp({});
