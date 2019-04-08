const connection = {
  charset: 'utf8',
  filename: 'main.db',
  charset: 'utf8'
};

module.exports = {
  production: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection,
    migrations: {
      directory: './migrations'
    }
  }
};
