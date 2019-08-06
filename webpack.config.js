const path = require('path');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'client/dist'),
    compress: true,
    port: 3000,
    historyApiFallback: true, // navigation
  },

  devtool: 'cheap-eval-source-map', // fast build, super fast rebuilds

  performance: {
    maxEntrypointSize: 10000,
    maxAssetSize: 10000,
    hints: false,
  },

  entry: path.join(__dirname, 'client/src/index.jsx'),

  mode: 'production',

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
        use: ['style-loader', 'css-loader'],
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
};
