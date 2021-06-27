const path = require('path');
const SRC_DIR = path.resolve('client/src');
const DIST_DIR = path.resolve('client/public');

module.exports = {
  mode: 'development',
  watch: true,
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
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
  },
}
