require('dotenv').config({ path: __dirname + '/.env.development' });

const connection = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  charset: 'utf8'
};

module.exports = {
  production: {
    client: 'mysql2',
    connection,
    migrations: {
      directory: './migrations'
    }
  }
};
