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
    root: './'
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
        loader: ['style', 'css', 'resolve-url']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ["style", "css", 'resolve-url', 'sass?sourceMap']
      }
    ]
  }
};