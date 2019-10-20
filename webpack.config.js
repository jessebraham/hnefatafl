const HtmlWebPackPlugin    = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin         = require("terser-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");


// Constant flag to indicate whether or not we should build for production.
const PRODUCTION = process.env.NODE_ENV === "production";

module.exports = {
  entry: [
    "./src/index.html",
    "./src/css/main.css",
    "./src/js/index.js"
  ],

  output: {
    filename: "js/app.[hash].js",
  },

  optimization: {
    minimize: PRODUCTION,
    minimizer: PRODUCTION ? [new TerserPlugin()] : [],
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: process.env.NODE_ENV === "production",
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: "babel-loader" },
          {
            loader: "prettier-loader",
            options: {
              parser: "babel",
              trailingComma: "all",
            },
          }
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*"]
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/app.[hash].css"
    }),
  ]
};
