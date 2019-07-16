module.exports = {
  entry: __dirname + '/client/src/index.jsx',

  mode: "production",

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { modules: false }],
              '@babel/preset-react',
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  output: {
    path: __dirname + '/client/dist',
    filename: 'bundle.js',
    publicPath: '/'
  }
}
