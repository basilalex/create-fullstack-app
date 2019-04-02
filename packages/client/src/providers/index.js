import { pipe } from '../utils';
import { createApolloClient } from './apolloClient';
import { createHistory } from './history';

export const createProviders = pipe(createApolloClient, createHistory);
