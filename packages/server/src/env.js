import path from 'path';
import dotenv from 'dotenv';

export const env = dotenv.config({ path: path.join(process.cwd() + '/.env') }).parsed;
export default env;
