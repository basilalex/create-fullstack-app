const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

const config = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build/')
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.graphql?$/, loader: 'webpack-graphql-loader' }
    ]
  },
  target: 'async-node',
  externals: [
    nodeExternals()
  ],
  plugins: [
    new CleanWebpackPlugin(),
    new NodemonPlugin()
  ],
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    return { ...config, devtool: 'source-map' };
  }

  return config;
};
