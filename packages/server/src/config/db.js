import knex from 'knex';

export const connectDb = appCtx => {
  const { env: { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } } = appCtx;

  const connection = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    charset: 'utf8'
  };

  const db = knex({
    client: 'mysql2',
    connection
  });

  return { ...appCtx, db };
};
