
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('item', table => {
      table.increments();
      table.string('title');
      table.string('description');
      table.timestamp('created_at', 6).defaultTo(knex.fn.now(6));
      table.timestamp('updated_at', 6).defaultTo(knex.fn.now(6));
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([ knex.schema.dropTable('item') ]);
};
