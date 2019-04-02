import ApolloClient from 'apollo-boost';

export const createApolloClient = appCtx => {
  const apolloClient = new ApolloClient({ uri: `${process.env.REACT_APP_API_URL}/graphql` });
  return { ...appCtx, apolloClient }
};
