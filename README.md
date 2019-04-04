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

1. GraphQL
2. Architecture
3. Tools
4. Queries
5. Mutations
6. Subscriptions
7. Summary

<!-- https://css-tricks.com/front-end-developers-guide-graphql -->
<!-- https://blog.apollographql.com/inspecting-your-graphql-client-in-the-browser-2481f8bcdd55 -->

## GraphQL

[GraphQL](https://graphql.org/learn) is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data. GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data.

Over the past years, GraphQL became the industry-standard technology for moving data between modern applications, where `GraphQL` means the ecosystem of tools that helps you develop applications. The main idea is that the shape of your result matches the shape of your query:

```graphql
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      id
      isBooked
    }
  }
```

Here we expecting an object with `launch` method, which includes both `id` and `isBooked` methods.

## Architecture

In this section, I’ll walk you through the architecture that was implemented -- [GraphQL server with a connected database](https://www.howtographql.com/basics/3-big-picture).

In the setup, you have a single web-server that implements the GraphQL specification. When a query arrives at the GraphQL server, the server reads the query’s payload and fetches the required information from the database. This is called resolving the query. It then constructs the response object as described in the official specification and returns it to the client.

It’s important to note that GraphQL is actually transport-layer agnostic. This means it can potentially be used with any available network protocol. So, it is potentially possible to implement a GraphQL server based on TCP, WebSockets, etc.

## Tools

GraphQL service creates with a `schema` and `resolvers` which return data for the schema. All that serves by `ApolloServer()`.
