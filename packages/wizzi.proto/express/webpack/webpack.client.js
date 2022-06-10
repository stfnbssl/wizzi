const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: path.resolve(__dirname,'./client/index.html'),
  filename: "./index.html"
});

module.exports = {
    entry: path.resolve(__dirname,'./client/index.js'),
    output: {
        path: path.resolve(__dirname, 'client-build'),
        filename: 'index.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },
    plugins: [htmlPlugin]
};