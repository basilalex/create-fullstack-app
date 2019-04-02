export const Mutation = {
  async createItem(obj, { title, description }, { DAO }, info) {
    return DAO.createItem(title, description);
  }
};
