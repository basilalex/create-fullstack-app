# How to create and debug GraphQL Apollo Queries, Mutations, and Subscriptions

1. GraphQL
2. Tools
3. Queries
4. Mutations
5. Subscriptions
6. Summary

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

## Tools

GraphQL service creates with a `schema` and `resolvers` which return data for the schema. All that serves by `ApolloServer()`.

