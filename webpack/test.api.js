const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  context: path.join(__dirname, '../tests'),
  node: { __filename: true, __dirname: false },
  devtool: 'source-map',
  entry: {
    users: './api/users.js', 
    events: './api/events.js',
    centers: './api/centers.js',
  },
  output: {
    path: path.join(__dirname, '../tests/bin'),
    filename: '[name]_api.js',
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('test')
      }
    }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
  ]
};
