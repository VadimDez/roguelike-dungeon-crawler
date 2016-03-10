/**
 * Created by Vadym Yatsyuk on 18/02/16
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  resolveUrlLoader: {
    root: __dirname,
    sourceMap: true
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ['style', 'css']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ["style", "css?sourceMap", 'resolve-url', 'sass?sourceMap']
      }
    ]
  }
};