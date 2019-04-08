export const getCspConfig = appCtx => {
  const cspConfig = {
    directives: {
      baseUri: [ `${appCtx.env.WEBSITE_URL}` ],
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
  
  return { ...appCtx, cspConfig };
};
