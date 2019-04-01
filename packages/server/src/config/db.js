import knex from 'knex';

const connection = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  charset: 'utf8'
};

export const db = knex({
  client: 'mysql2',
  connection
});
