export const Query = {
  async item(parent, { id }, { DAO }, info) {
    return DAO.queryItem(id);
  },
  async items(parent, args, { DAO }, info) {
    return DAO.queryItems();
  }
};
