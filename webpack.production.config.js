const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const path = require('path');
const srcPath = path.resolve(__dirname, 'assets', 'scripts', 'main.js')
const buildPath = path.resolve(__dirname, 'public', 'js')
const nodeModulesPath = path.resolve(__dirname, 'node_modules')

const config = {
  devtool: 'source-map',
  entry: {
    vendor: ['jquery', 'bootstrap-sass', 'simple-pjax'],
    main: srcPath
  },
  output: {
    path: buildPath,
    filename: '[name].[chunkhash].js',
    publicPath: 'js'
  },

  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: nodeModulesPath,
      options: { presets: ['es2015'] },
    }]
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    // Abstract a common file between all config.entry JS
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons.chunk',
      filename: 'commons.chunk.[chunkhash].js'
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: { warnings: false },
      sourceMap: false
    }),
    new ManifestPlugin()
  ]
};

module.exports = config;