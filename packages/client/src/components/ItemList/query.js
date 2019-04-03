import gql from 'graphql-tag';

export const GET_ITEMS = gql`
  {
    items {
      id
      title
    }
  }
`;
