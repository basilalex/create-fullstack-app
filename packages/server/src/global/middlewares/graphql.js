export const graphql = ({ app, apolloServer }) => apolloServer.applyMiddleware({ app, path: '/graphql' });
