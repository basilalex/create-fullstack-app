import { pipe } from '../utils';
import { createDAO } from './DAO';

export const createProviders = pipe(createDAO);
