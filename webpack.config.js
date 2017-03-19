/**
 * Created by Vadym Yatsyuk on 18/02/16
 */
let webpack = require('webpack');
const path = require('path');

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
  context: __dirname,
  devtool: 'eval-source-map',
  devServer: {
    hot: true
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: ['react-hot-loader', 'babel-loader?presets[]=es2015&presets[]=react'],
        exclude: /node_modules/,
        // options: {
        //   presets: ['es2015', 'react']
        // }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader?sourceMap'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin([
      path.join(__dirname, 'node_modules')
    ])
  ]
};
