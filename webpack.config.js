const webpack = require('webpack');
const path = require('path');

const sourcePath = 'src';
const projectRoot = path.resolve(`${__dirname}/${sourcePath}`);

module.exports = {
  entry: `./${sourcePath}/demo.js`,
  output: {
    path: __dirname + '/dist',
    filename: "demo.min.js"
  },
  module: {
    rules: [
      { test: /\.js?$/, use: "eslint-loader", exclude: /node_modules/, enforce: "pre" },
      { test: /\.js?$/, use: 'babel-loader', exclude: /node_modules/}
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  devtool: 'source-map'
}
