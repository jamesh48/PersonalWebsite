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
  new webpack.DefinePlugin({
    'process.env.cFLink': JSON.stringify(process.env.CLOUDFRONTLINK || 'development'),
    'process.env.DEV_ENV': process.env.DEV_ENV,
    'process.env.SENDGRID_API_KEY': JSON.stringify(process.env.sendGridAPIKey),
    'process.env.sendGridToEmail': JSON.stringify(process.env.sendGridToEmail),
    'process.env.sendGridFromEmail': JSON.stringify(process.env.sendGridFromEmail),
    'process.env.nubelaAPIToken': JSON.stringify(process.env.nubelaAPIToken),
    'process.env.nubelaRoute': JSON.stringify(process.env.nubelaRoute)
  }),
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
      PortfolioJSON: path.resolve('Data/PortfolioDataJSON.js'),
      FooterJSON: path.resolve('Data/FooterDataJSON.js'),
      Database: path.resolve('db'),
      Public: path.resolve('src/public'),
      Server: path.resolve('src/server'),
      Minesweeper: path.resolve('src/server/Minesweeper'),
      GlobalStore: path.resolve(__dirname, 'src/public/GlobalStore/globalStore.js'),
      HomeStore: path.resolve(__dirname, 'src/public/components/HomeComponents/HomeStore/homeStore.js'),
      MarqueeStore: path.resolve(__dirname, 'src/public/components/MarqueeComponents/MarqueeStore/marqueeStore.js'),
      ResumeStore: path.resolve(__dirname, 'src/public/components/ResumeComponents/ResumeStore/resumeStore.js'),
      PortfolioStore: path.resolve(__dirname, 'src/public/components/PortfolioComponents/PortfolioStore/portfolioStore.js'),
      NestedPortfolioStore: path.resolve(__dirname, 'src/public/components/PortfolioComponents/NestedPortfolioStore/nestedPortfolioStore.js'),
      AdminFormStore: path.resolve(__dirname, 'src/public/components/AdminForm/AdminFormStore/adminFormStore.js'),
      GlobalUtils: path.resolve(__dirname, 'globalUtils.js'),

    },
  }
};

const clientConfig = {
  mode: "development",
  devtool: "source-map",
  // Req by webpack 5/ala dotenv-environment variables
  resolve: {
    //   fallback: {
    //     "fs": false,
    //     "path": false,
    //     "os": false
    //   }
    alias: {
      GlobalStore: path.resolve(__dirname, 'src/public/GlobalStore/globalStore.js'),
      HomeStore: path.resolve(__dirname, 'src/public/components/HomeComponents/HomeStore/homeStore.js'),
      AdminFormStore: path.resolve(__dirname, 'src/public/components/AdminForm/AdminFormStore/adminFormStore.js'),
      MarqueeStore: path.resolve(__dirname, 'src/public/components/MarqueeComponents/MarqueeStore/marqueeStore.js'),
      ResumeStore: path.resolve(__dirname, 'src/public/components/ResumeComponents/ResumeStore/resumeStore.js'),
      PortfolioStore: path.resolve(__dirname, 'src/public/components/PortfolioComponents/PortfolioStore/portfolioStore.js'),
      NestedPortfolioStore: path.resolve(__dirname, 'src/public/components/PortfolioComponents/NestedPortfolioStore/nestedPortfolioStore.js'),
      GlobalUtils: path.resolve(__dirname, 'globalUtils.js'),
    }
  },
  target: "web",
  plugins: [new MiniCssExtractPlugin(),
  new webpack.DefinePlugin({
    'process.env.cFLink': JSON.stringify(process.env.CLOUDFRONTLINK || 'development'),
    'process.env.DEV_ENV': process.env.DEV_ENV
  }),
  ],
  entry: {
    "appRouter": path.resolve(__dirname, "src/public/AppRouterRoot.js"),
    "footer": path.resolve(__dirname, "src/public/FooterRoot.js"),
    "minesweeper": path.resolve(__dirname, "src/public//MinesweeperRoot.js")
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

