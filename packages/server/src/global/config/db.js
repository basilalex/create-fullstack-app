import knex from 'knex';

const connection = {
  charset: 'utf8',
  filename: './main.db'
};

export const db = knex({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection
});
