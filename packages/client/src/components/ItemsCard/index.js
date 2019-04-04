import React from 'react';
import { Query } from 'react-apollo';
import { ItemList, AddItemButton } from '..';
import { GET_ITEMS } from './query';
import { ITEMS_SUBSCRIPTION } from './subscription';

const { platform, product } = window.navigator;
const title = `${platform} - ${product}`;

const handleQuery = ({ subscribeToMore, ...rest }) => (
  <ItemList
    {...rest}
    subscribeToNewItems={() => subscribeToMore({
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

export const ItemsCard = () => (
  <div>
    <AddItemButton title={title} />
    <Query query={GET_ITEMS}>
      {handleQuery}
    </Query>
  </div>
);
