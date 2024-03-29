import { split } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';

const isSubscription = ({ query }) => {
  const { kind, operation } = getMainDefinition(query);
  return kind === 'OperationDefinition' && operation === 'subscription';
};

const cache = new InMemoryCache();
export const httpLink = new HttpLink({ uri: process.env.REACT_APP_API_URL });

export const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_SUBSCRIPTION_URL,
  options: {
    reconnect: true
  },
});

export const link = split(isSubscription, wsLink, httpLink);

export const apolloClient = new ApolloClient({ link, cache });
