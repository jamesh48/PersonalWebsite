const path = require('path');
const SRC_DIR = path.resolve('client/src');
const DIST_DIR = path.resolve('client/public');

module.exports = {
  devtool: "eval-source-map",
  // for production:
  // devtool: "source-map",
  mode: 'development',
  entry: path.join(SRC_DIR, 'index.jsx'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"]
        },
      },
      {
        test: /\.(css|scss)$/,
        include: path.resolve('client/src/styles'),
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              // discardDuplicates: true,
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
              sourceMap: process.env.NODE_ENV !== 'production',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: process.env.NODE_ENV !== 'production',
            },
          },
        ]
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
  },
  devServer: {
    port: 8000,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    contentBase: path.resolve('client/public'),
    proxy: {
      "/": "http://localhost:4300"
    },
  },

}
