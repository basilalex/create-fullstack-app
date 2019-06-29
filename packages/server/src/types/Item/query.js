import DAO from './DAO';

export const query = {
  async item(parent, { id }, ctx, info) {
    return DAO.queryItem(id);
  },
  async items(parent, args, ctx, info) {
    return DAO.queryItems();
  }
};
