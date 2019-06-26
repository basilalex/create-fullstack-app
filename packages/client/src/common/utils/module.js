export const mergeModules = (...modules) => {
  const reducers = modules.reduce((acc, { reducers }) => reducers ? ({ ...acc, ...reducers }) : acc, {});
  const routes = modules.reduce((acc, { routes }) => routes ? acc.concat(...routes) : acc, []);

  return { reducers, routes };
};
