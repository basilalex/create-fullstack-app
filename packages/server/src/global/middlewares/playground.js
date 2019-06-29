import expressPlayground from 'graphql-playground-middleware-express';

export const playground = ({ app }) => {
  if (process.env.NODE_ENV === 'development') {
    app.get('/playground', expressPlayground({
      endpoint: '/graphql',
      subscriptionsEndpoint: '/subscriptions'
    }));
  }
};
