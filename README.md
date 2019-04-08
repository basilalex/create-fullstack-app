## `Root`

### Features:
- Client
- Server

### Scripts
How to run:

```
yarn build
yarn serve
```

# `How to create and debug GraphQL Apollo Queries, Mutations, and Subscriptions`

- GraphQL
- Architecture
- Fetch data with Query components
- Update data with Mutation components
- Real-time data updates with GraphQL subscriptions
- Apollo Client Devtools
- Summary

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

<img src='https://imgur.com/cRE6oeb.png' style='display: block; margin: 0 auto'>

It’s important to note that GraphQL is actually transport-layer agnostic. This means it can potentially be used with any available network protocol. So, it is potentially possible to implement a GraphQL server based on TCP, WebSockets, etc.

GraphQL also doesn’t care about the database or the format that is used to store the data. You could use a SQL database like AWS Aurora or a NoSQL database like MongoDB.

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

## Apollo Client Devtools

The [Apollo Client Devtools](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm) is a Chrome extension which appear as an "Apollo" tab in your Chrome inspector, along side the "Elements" and "Console" tabs.

GraphiQL: Send queries to your server through the Apollo network interface, or query the Apollo cache to see what data is loaded.

<img src='https://raw.githubusercontent.com/apollographql/apollo-client/apollo-client%402.5.1/docs/source/assets/devtools/apollo-client-devtools/apollo-devtools-graphiql.png' style='display: block; margin: 0 auto'>

Normalized store inspector: Visualize your GraphQL store the way Apollo Client sees it, and search by field names or values.

<img src='https://raw.githubusercontent.com/apollographql/apollo-client/apollo-client%402.5.1/docs/source/assets/devtools/apollo-client-devtools/apollo-devtools-store.png' style='display: block; margin: 0 auto'>

Watched query inspector: View active queries and variables, and locate the associated UI components.

<img src='https://raw.githubusercontent.com/apollographql/apollo-client/apollo-client%402.5.1/docs/source/assets/devtools/apollo-client-devtools/apollo-devtools-queries.png' style='display: block; margin: 0 auto'>
