import React from 'react';
import { Mutation } from 'react-apollo';
import { CREATE_ITEM } from './mutation';

export const AddItemButton = ({ title }) => (
  <Mutation mutation={CREATE_ITEM}>
    {(createItem, { loading }) => (
      <button disabled={loading} onClick={() => createItem({ variables: { title } })}>
        Add
      </button>
    )}
  </Mutation>
);
