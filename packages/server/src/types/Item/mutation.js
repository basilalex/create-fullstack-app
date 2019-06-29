import { pubsub } from '../pubSub';
import DAO from './DAO';

export const mutation = {
  async createItem(obj, { title }, ctx, info) {
    const item = await DAO.createItem(title);
    pubsub.publish('ITEM_ADDED', { itemAdded: item });
    return item;
  }
};
