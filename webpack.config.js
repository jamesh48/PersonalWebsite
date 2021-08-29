require('dotenv').config({path: './.env'})
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const path = require("path");

const css = {
  test: /\.(css|scss)$/,
  include: path.resolve(__dirname, 'src'),
  exclude: /node_modules/,
  use: [MiniCssExtractPlugin.loader, "css-loader", {
    loader: "sass-loader"
  }]
}

const js = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env", "@babel/preset-react"],
    },
  },
};

const serverConfig = {
  mode: "production",
  target: "node",
  plugins: [new Dotenv(), new MiniCssExtractPlugin()],
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
  entry: {
    "index": path.resolve(__dirname, "src/server/index.js"),
  },
  module: {
    rules: [js, css],
  },
  output: {
    path: path.resolve(__dirname, "dist/server"),
    filename: "[name].js",
  },
};

const clientConfig = {
  mode: "production",
  target: "web",
  plugins: [new Dotenv(), new MiniCssExtractPlugin()],
  entry: {
    "appRouter": path.resolve(
      __dirname,
      "src/public/appRouter.js"
    ),
    "footer": path.resolve(__dirname, "src/public/footer.js"),
    "minesweeper": path.resolve(__dirname, "src/public/components/MinesweeperComponents/Minesweeper_Proxy.js")
  },
  module: {
    rules: [js, css],
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: "all",
  //   },
  // },
  output: {
    path: path.resolve(__dirname, "dist/public"),
    filename: "[name].js",
  },
};

module.exports = [serverConfig, clientConfig];
