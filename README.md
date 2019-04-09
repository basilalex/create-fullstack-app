## `Root`

### Features:
- Client
- Server

### Scripts
How to run:

```
yarn build
yarn migrate
yarn serve
```

# `How to create and debug GraphQL Apollo Queries, Mutations, and Subscriptions`

## GraphQL

[GraphQL](https://graphql.org/learn) is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data. GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data.

Over the past years, GraphQL became the industry-standard technology for moving data between modern applications, where `GraphQL` means the ecosystem of tools that helps you develop applications. The main idea is that the shape of your result matches the shape of your query:

```graphql
query item($id: ID!) {
  item(id: $id) {
    id
    title
  }
}
```

Here we expecting an object with `item` method, which includes both `id` and `title`.

## Architecture

In this section, I’ll walk you through the architecture that was implemented - [GraphQL server with a connected database](https://www.howtographql.com/basics/3-big-picture).

In the setup, you have a single web-server that implements the GraphQL specification. When a query arrives at the GraphQL server, the server reads the query’s payload and fetches the required information from the database. This is called resolving the query. It then constructs the response object as described in the official specification and returns it to the client.

<img src='https://i.imgur.com/z9VKnHs.png' style='display: block; margin: 0 auto'>

It’s important to note that GraphQL is actually transport-layer agnostic. This means it can potentially be used with any available network protocol. So, it is potentially possible to implement a GraphQL server based on TCP, WebSockets, etc.

GraphQL also doesn’t care about the database or the format that is used to store the data. You could use a SQL database like AWS Aurora or a NoSQL database like MongoDB.

## Apollo Server

[Apollo Server](https://www.apollographql.com/docs/apollo-server) implements a spec-compliant GraphQL server which can be queried from any GraphQL client, enabling:

<img src='https://raw.githubusercontent.com/apollographql/apollo-server/apollo-server%402.4.8/docs/source/images/index-diagram.svg?sanitize=true' style='display: block; margin: 0 auto'>

- An easy start, so front-end and back-end developers can start fetching data quickly.
- Incremental adoption, allowing advanced features to be added when they're needed.
- Universal compatibility with any data source, any build tool and any GraphQL client.
- Production readiness, and what you build in development works great in production.

Server creations as simple as that:
```javascript
import express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import expressPlayground from 'graphql-playground-middleware-express';
import typeDefs from './schema.graphql';

// ...

const app = express();
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: '/subscriptions',
  context: ({ req }) => ({ ...req, DAO })
});

apolloServer.applyMiddleware({ app, path: '/graphql' });

const ws = createServer(app);
apolloServer.installSubscriptionHandlers(ws);

ws.listen(PORT || 8080);
```
The code above creates a GraphQL server, which is ready to handle `queries`, `mutations` and `subscriptions`.

## Fetch data with Query components

To make a query you need to import `Query` component which expects at least two props:
- a GraphQL query string passed to the `query` prop
- render prop function that returns a React element

```jsx
import { Query } from 'react-apollo';
import { GET_ITEMS } from './query';

export const ItemsCard = () => (
  <div>
    <Query query={GET_ITEMS}>
      {handleQuery}
    </Query>
  </div>
);
```

In `handleQuery` function we can use `loading`, `error`, and `data` properties to determine which UI elements we should return depending on the state of our query.

## Update data with Mutation components

To update the data you will need the `Mutation` component with provided props:
- a GraphQL mutation string passed to the `mutation` prop
- render prop function that returns a React element

```jsx
import { Mutation } from 'react-apollo';
import { CREATE_ITEM } from './mutation';

<Mutation mutation={CREATE_ITEM}>
  {(createItem, { loading }) => (
    <button disabled={loading} onClick={() => createItem({ variables: { title } })}>
      Add
    </button>
  )}
</Mutation>
```

The first argument of the render prop function is the mutate function, which you specified in the GraphQL mutation tag and call to tell Apollo Client that you'd like to trigger a mutation. 

The second argument to the render prop function is an object, which contains all information like mutation result, `called` and `loading` booleans, `error` object.

## Real-time data updating with GraphQL subscriptions

Another one cool feature is a GraphQL [subscriptions](https://www.apollographql.com/docs/react/advanced/subscriptions), which are a way to push data from the server to the clients that already subscribed for updates.

A common use case for subscriptions is notifying the client side about particular events and especially useful if:
1. The initial state is large, but the incremental change sets are small. The starting state can be fetched with a query and subsequently updated through a subscription.
2. You care about low-latency updates in the case of specific events, for example in the case of a chat application where users expect to receive new messages in a matter of seconds.

```jsx
import { ITEMS_SUBSCRIPTION } from './subscription';

const handleQuery = ({ subscribeToMore, ...rest }) => (
  <ItemList {...rest} subscribeToNewItems={() => subscribeToMore({
      document: ITEMS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const { itemAdded } = subscriptionData.data;
        return { items: [ ...prev.items, itemAdded ] };
      }
    })}
  />
);
```

In this example, the `handleQuery` function subscribes on new items creation event. As argument it receives an object with `subscribeToMore` function, which takes a config with a GraphQL subscription string and `updateQuery` method, which will update the cache by returning the object.

## Debug

### Apollo Client Devtools

The [Apollo Client Devtools](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm) is a Chrome extension which appear as an "Apollo" tab in your Chrome inspector, along side the "Elements" and "Console" tabs.

There are a couple great features:
- GraphiQL: Send queries to your server through the Apollo network interface, or query the Apollo cache to see what data is loaded.
- Normalized store inspector: Visualize your GraphQL store the way Apollo Client sees it, and search by field names or values.
- Watched query inspector: View active queries and variables, and locate the associated UI components.

### Logging

If you just want to log something quick in order to debug something in your server environment, then you can provide `formatError` and `formatResponse` callback functions to the `ApolloServer` config as in the example.

```javascript
const logger = log => {
  console.log(log);
  return log;
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: '/subscriptions',
  context: ({ req }) => ({ ...req, DAO }),
  formatError: logger,
  formatResponse: logger
});
```

For more advanced cases, Apollo Server provides [an experimental api](https://www.apollographql.com/docs/apollo-server/features/metrics) that accepts an array of `graphql-extensions` to the extensions field. These extensions receive a variety of lifecycle calls for each phase of a GraphQL request and can keep state, such as the request headers.

```javascript
import { LoggingExtension } from './logging';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: '/subscriptions',
  context: ({ req }) => ({ ...req, DAO }),
  extensions: [() => new LoggingExtension()]
});
```

### GraphQL Playground
[GraphQL Playground](https://github.com/prisma/graphql-playground) is a graphical, interactive, in-browser GraphQL IDE, created by [Prisma](https://www.prisma.io) and based on GraphiQL.

<img src='https://camo.githubusercontent.com/1a26385e3543849c561cfafd0c25de791a635570/68747470733a2f2f692e696d6775722e636f6d2f41453557364f572e706e67' style='display: block; margin: 0 auto'>

GraphQL Playground uses components of [GraphiQL](https://github.com/graphql/graphiql) under the hood but is meant as a more powerful GraphQL IDE enabling better (local) development workflows. Compared to GraphiQL, the GraphQL Playground ships with the following additional features:

- Interactive, multi-column schema documentation
- Automatic schema reloading
- Support for GraphQL Subscriptions
- Query history
- Configuration of HTTP headers
- Tabs
