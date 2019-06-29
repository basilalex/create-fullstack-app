import { camelizeKeys } from 'humps';
import { db } from '../../global';

export const Item = {
  async queryItem(id) {
    return camelizeKeys(await db('item').select().where({ id }).first());
  },
  async queryItems() {
    return camelizeKeys(await db('item').select());
  },
  async createItem(title) {
    const [ id ] = await db('item').insert({ title });
    return this.queryItem(id);
  }
};

export default Item;
