import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';

const components = [
  Home
];

const mapComponentToRoute = route => <Route key={route.path} {...route} />;
const mapComponentsToRoutes = components => components.map(mapComponentToRoute);
const routes = mapComponentsToRoutes(components);

export const getRoutes = appCtx => ({ ...appCtx, routes });
