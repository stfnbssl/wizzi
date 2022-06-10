const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.resolve(__dirname,'./server/index.js'),

  target: 'node',

  externals: [nodeExternals()],

  output: {
    path: path.resolve(__dirname, 'server-build'),
    filename: 'index.js'
  },

  node: {
    __dirname: false,
    __filename: false 
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  }
}; 