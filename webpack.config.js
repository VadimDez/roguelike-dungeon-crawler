/**
 * Created by Vadym Yatsyuk on 18/02/16
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:9000',
    'webpack/hot/only-dev-server',
    './index.js'
  ],
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
        loaders: ['react-hot', 'babel-loader?presets[]=es2015&presets[]=react'],
        exclude: /node_modules/,
        // query: {
        //   presets: ['es2015', 'react']
        // }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ['style', 'css']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ["style", "css", 'resolve-url', 'sass?sourceMap']
        // loaders: ['react-hot', "style", "css", 'sass?sourceMap']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};