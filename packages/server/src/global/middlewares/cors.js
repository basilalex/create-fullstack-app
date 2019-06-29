import corsMiddleware from 'cors';
import { env } from '..';

export const cors = ({ app }) => {
  app.use(corsMiddleware({
    credentials: true,
    origin: env.WEBSITE_URL,
    optionsSuccessStatus: 200,
    methods: 'GET,POST',
  }));
};
