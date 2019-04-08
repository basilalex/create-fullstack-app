
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('item', table => {
      table.increments();
      table.string('title');
      table.timestamps(false, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([ knex.schema.dropTable('item') ]);
};
