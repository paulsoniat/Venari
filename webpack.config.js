const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public/dist');
const APP_DIR = path.resolve(__dirname, 'public/dist');
module.exports = {
  entry: {
    index: APP_DIR + '/index.js', 
    challenge: APP_DIR + '/challenge.js' },
  output: {
    path: BUILD_DIR,
    filename: '[name].js',
  },
  module: {

    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react']
        }
      },
      { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
      { test: /\.styl$/, loader: ['style-loader', 'css-loader', 'stylus-loader'] },
    ],
  },


};