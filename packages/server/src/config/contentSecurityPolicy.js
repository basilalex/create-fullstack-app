const cspConfig = {
  directives: {
    baseUri: [ `${process.env.WEBSITE_URL}` ],
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
  }
};

export const getCspConfig = appCtx => ({ ...appCtx, cspConfig });
