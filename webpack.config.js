// dotenv must be required as early as possible for env vars to propogate
require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'client/dist'),
    compress: true,
    port: 3000,
    historyApiFallback: true,
    proxy: [
      {
        context: () => true,
        target: 'http://localhost:8000',
        secure: false,
      },
    ],
  },
  devtool: isDev ? 'cheap-eval-source-map' : 'none',
  entry: path.join(__dirname, 'client/src/index.jsx'),
  mode: isDev ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.(html)$/,
        use: { loader: 'html-loader' },
      },
      {
        test: /\.(png|jpg|gif|jpeg|ttf)$/,
        use: [
          { loader: 'file-loader', options: { name: '[path][name].[ext]' } },
        ],
      },
    ],
  },
  output: {
    path: path.join(__dirname, 'client/dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  performance: {
    maxEntrypointSize: 10000,
    maxAssetSize: 10000,
    hints: false,
  },
  plugins: [
    // compress bundle
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new HtmlWebpackPlugin({
      title: 'RFC Boilerplate',
      template: path.join(__dirname, 'client/src/index.html'),
      inject: 'body',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
      chunkFilename: '[id][hash].css',
    }),
    // smash it
    new UglifyJsPlugin({ sourceMap: true }),
    // set node_env
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev
          ? JSON.stringify('development')
          : JSON.stringify('production'),
      },
    }),
    // hoist scope
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
};
