import React from 'react';
import { Query } from 'react-apollo';
import { ItemList } from '..';
import { GET_ITEMS } from './query';
import { ITEMS_SUBSCRIPTION } from './subscription';
import { AddItemButton } from './AddItemButton';

const { platform, product, connection } = window.navigator;
const title = `${platform} - ${product} - ${connection.effectiveType}`;

const handleQuery = ({ subscribeToMore, ...rest }) => (
  <ItemList
    {...rest}
    subscribeToNewItems={() => subscribeToMore({
      document: ITEMS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        console.log('========== prev: ', prev);

        if (!subscriptionData.data) {
          return prev;
        }

        const { itemAdded } = subscriptionData.data;

        console.log('========== itemAdded: ', itemAdded);

        return { ...prev, itemAdded };
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
