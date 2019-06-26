import { pubsub } from '../pubSub';

export const mutation = {
  async createItem(obj, { title }, { Item }, info) {
    const item = await Item.createItem(title);
    pubsub.publish('ITEM_ADDED', { itemAdded: item });
    return item;
  }
};
