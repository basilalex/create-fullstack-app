import { split } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink, createHttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';

const isSubscription = ({ query }) => {
  const { kind, operation } = getMainDefinition(query);
  return kind === 'OperationDefinition' && operation === 'subscription';
};

export const createApolloClient = appCtx => {
  const cache = new InMemoryCache();
  // const httpLink = createHttpLink({ uri: process.env.REACT_APP_API_URL });

  // const wsLink = new WebSocketLink({
  //   uri: process.env.REACT_APP_SUBSCRIPTION_URL,
  //   options: {
  //     reconnect: true
  //   }
  // });

  // const link = split(isSubscription, wsLink, httpLink);
  // const apolloClient = new ApolloClient({ link, cache });

  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_API_URL
  });

  // Create a WebSocket link:
  const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_SUBSCRIPTION_URL,
    options: {
      reconnect: true
    }
  });

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
  );

  const apolloClient = new ApolloClient({ link, cache });

  return { ...appCtx, apolloClient }
};
