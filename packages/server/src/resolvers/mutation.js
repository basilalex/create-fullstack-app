export const Mutation = {
  async createItem(obj, { title }, { DAO }, info) {
    return DAO.createItem(title);
  }
};
