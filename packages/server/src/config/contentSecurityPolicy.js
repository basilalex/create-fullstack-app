import { env } from '../env';

export const cspConfig = {
  directives: {
    baseUri: [ `${env.WEBSITE_URL}` ],
    fontSrc: [ "'self'", "data:" ],
    scriptSrc: [ "'self'", "'unsafe-inline'" ],
    styleSrc: [ "'self'" ],
    defaultSrc: [ "'self'" ],
    imgSrc: [ "'self'" ],
    manifestSrc: [ "'self'" ],
    mediaSrc: [ "'self'" ],
    objectSrc: [ "'none'" ],
    formAction: [ "'none'" ],
    upgradeInsecureRequests: true,
    frameAncestors: [ "'self'" ]
  }
};
