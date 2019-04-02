import { createBrowserHistory } from 'history';

export const createHistory = appCtx => {
  const history = createBrowserHistory();
  return { ...appCtx, history };
};
