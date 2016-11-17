// If you want to move Bootstrap from the public directory & integrate with Webpack:
// https://github.com/AngularClass/angular2-webpack-starter/issues/696#issuecomment-227786637
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')
const path = require('path')

const nodeModulesPath = path.resolve(__dirname, 'node_modules')
const buildPath = path.resolve(__dirname, 'public', 'js')
const mainPath = path.resolve(__dirname, 'assets', 'scripts', 'main.js')
const config = {
  devtool: 'eval',
  entry: {
    vendor: ['jquery', 'bootstrap-sass', 'chart.js', 'simple-pjax'],
    main: mainPath
  },
  output: {
    path: buildPath,
    filename: '[name]-[chunkhash].js',
    publicPath: 'js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: nodeModulesPath,
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015']
        }
      },
      { test: /vendor\/.+\.(jsx|js)$/, loader: 'imports?jQuery=jquery,$=jquery,this=>window' },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
      },
      {
        test: /\.woff2(\?\S*)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff2&name=fonts/[name].[ext]'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-tff&name=fonts/[name].[ext]'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file?name=fonts/[name].[ext]'
      },
      {
        test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file?name=img/[name].[ext]'
      },
      {
        test: /\.gif(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file?name=img/[name].[ext]'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml&name=img/[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', '[name].js'),
    new ManifestPlugin(),
    new ChunkManifestPlugin({
      filename: 'manifest.json',
      manifestVariable: 'webpackManifest'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ]
}

module.exports = config