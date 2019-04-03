import { camelizeKeys } from 'humps';

export const createDAO = appCtx => {
  const { db } = appCtx;
  const DAO = {
    async queryItem(id) {
      return camelizeKeys(await db('item').select().where({ id }).first());
    },
    async queryItems() {
      return camelizeKeys(await db('item').select());
    },
    async createItem(title) {
      const [id] = await db('item').insert({ title });
      return this.queryItem(id);
    }
  };

  return { ...appCtx, DAO };
};
