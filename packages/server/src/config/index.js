import { pipe } from '../utils';
import { connectDb } from './db';

export const createConfig = pipe(connectDb);
