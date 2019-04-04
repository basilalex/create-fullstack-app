import { pubsub, ITEM_ADDED } from './pubSub';

export const Mutation = {
  async createItem(obj, { title }, { DAO }, info) {
    const item = await DAO.createItem(title);
    pubsub.publish(ITEM_ADDED, { itemAdded: item });
    return item;
  }
};
