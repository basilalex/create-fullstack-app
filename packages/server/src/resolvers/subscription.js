import { pubsub, ITEM_ADDED } from './pubSub';

export const Subscription = {
  itemAdded: { subscribe: () => pubsub.asyncIterator([ ITEM_ADDED ])},
};
