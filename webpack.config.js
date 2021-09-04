const webpack = require('webpack');
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

require('dotenv').config({ path: './.env' });
const css = {
  test: /\.(css|scss)$/,
  include: path.resolve(__dirname, 'src'),
  exclude: /node_modules/,
  use: [MiniCssExtractPlugin.loader, "css-loader", {
    loader: "sass-loader",
    // options: {
    //   additionalData: process.env.CloudfrontCSS
    // }
// CloudfrontCSS=$Cloudfront: "https://d1y3bjxf7c78hf.cloudfront.net/main/main-images/linkedin.jpg"

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
  mode: "development",
  target: "node",
  plugins: [new MiniCssExtractPlugin(),
  //   new webpack.DefinePlugin({
  //   "process.env": JSON.stringify(json)
  // })
],
devtool: "source-map",
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
  resolve: {
    alias: {
      PortfolioJSON: path.resolve('Data/PortfolioData.json'),
      FooterJSON: path.resolve('Data/FooterData.json'),
      Database: path.resolve('db'),
      Public: path.resolve('src/public')
    },
  }
};

const clientConfig = {
  mode: "development",
  devtool: "source-map",
  // Req by webpack 5/ala dotenv-environment variables
  resolve: {
    fallback: {
      "fs": false,
      "path": false,
      "os": false
    },

  },
  target: "web",
  plugins: [new MiniCssExtractPlugin(),
  //   new webpack.DefinePlugin({
  //   "process.env": JSON.stringify(json)
  // })
  ],
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
