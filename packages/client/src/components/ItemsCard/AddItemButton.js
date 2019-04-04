import React from 'react';
import { Mutation } from 'react-apollo';
import { CREATE_ITEM } from './mutation';
import { GET_ITEMS } from './query';

const updateItemsCache = (cache, { data: { createItem } }) => {
  const { items } = cache.readQuery({ query: GET_ITEMS });
  cache.writeQuery({ query: GET_ITEMS, data: { items: [ ...items, createItem ] } });
};

export const AddItemButton = ({ title }) => (
  <Mutation mutation={CREATE_ITEM} update={updateItemsCache}>
    {(createItem, { loading }) => (
      <button disabled={loading} onClick={() => createItem({ variables: { title } })}>
        Add
      </button>
    )}
  </Mutation>
);
