import helmet from 'helmet';
import { cspConfig, featureConfig } from '..';

export const security = ({ app }) => {
  app.use(helmet());

  if (process.env.NODE_ENV === 'production') {
    app.use(helmet.contentSecurityPolicy(cspConfig));
    app.use(helmet.featurePolicy(featureConfig));
  }
};
