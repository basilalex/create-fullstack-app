import knex from 'knex';

export const connectDb = appCtx => {
  const connection = {
    charset: 'utf8',
    filename: './main.db'
  };

  const db = knex({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection
  });

  return { ...appCtx, db };
};
