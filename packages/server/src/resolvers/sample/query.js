export const query = {
  async item(parent, { id }, { Item }, info) {
    return Item.queryItem(id);
  },
  async items(parent, args, { Item }, info) {
    return Item.queryItems();
  }
};
