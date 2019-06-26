import gql from 'graphql-tag';

export const ITEMS_SUBSCRIPTION = gql`
  subscription itemAdded {
    itemAdded {
      id
      title
    }
  }
`;
