import { pubsub } from '../pubSub';

export const subscription = {
  itemAdded: { subscribe: () => pubsub.asyncIterator([ 'ITEM_ADDED' ])},
};
