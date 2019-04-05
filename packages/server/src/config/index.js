import { pipe } from '../utils';
import { connectDb } from './db';
import { getCspConfig } from './contentSecurityPolicy';
import { getFeatureConfig } from './featurePolicy';

export const createConfig = pipe(connectDb, getCspConfig, getFeatureConfig);
