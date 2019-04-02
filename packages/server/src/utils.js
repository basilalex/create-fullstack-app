
import path from 'path';
import dotenv from 'dotenv';

export const pipe = (...fns) => arg => fns.reduce((v, fn) => fn(v), arg);
export const getEnv = () => dotenv.config({ path: path.join(process.cwd() + '/.env.development')}).parsed;
