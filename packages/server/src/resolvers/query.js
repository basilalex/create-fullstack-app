export const Query = {
  async item(parent, { id }, { db }, info) {
    // query item from DAO
    return { id: 1, title: 'Sample title' };
  }
};
