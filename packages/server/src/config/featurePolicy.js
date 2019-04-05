const featureConfig = {
  features: {
    notifications: [ "'self'" ],
    magnetometer: [ "'self'" ],
    geolocation: [ "'self'" ],
    fullscreen: [ "'self'" ],
    microphone: [ "'self'" ],
    gyroscope: [ "'self'" ],
    speaker: [ "'self'" ],
    vibrate: [ "'none'" ],
    syncXhr: [ "'none'" ],
    camera: [ "'self'" ],
    payment: [ 'none' ],
    push: [ "'self'" ],
    midi: [ "'none'" ]
  },
};

export const getFeatureConfig = appCtx => ({ ...appCtx, featureConfig });
