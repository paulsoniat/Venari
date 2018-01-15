const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public/dist');
const APP_DIR = path.resolve(__dirname, 'public/client/components');
module.exports = {
  entry: {
    index: APP_DIR + '/index.jsx', 
    challenge: APP_DIR + '/challenge.jsx' ,
    upload: APP_DIR + '/ImageUploadForm.jsx'},
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