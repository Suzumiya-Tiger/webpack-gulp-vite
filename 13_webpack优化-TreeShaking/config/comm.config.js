const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ProvidePlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");
const devConfig = require("./dev.config");
const prodConfig = require("./prod.config");

const getCommonConfig = function (isProduction) {
  return {
    resolve: {
      extensions: [".js", ".jsx", ".json", ".ts"]
    },

    entry: "./src/demo.js",
    output: {
      path: path.resolve(__dirname, "../build"),

      filename: "js/[name]-bundle.js",
      // 针对单独分包的文件进行命名
      chunkFilename: "js/[name]-chunk.js",
      clean: true
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,

          exclude: /node_modules/,

          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.ts$/,
          use: "babel-loader"
        },
        {
          test: /\.less$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "less-loader"
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html"
      }),
      new ProvidePlugin({
        axios: ["axios", "default"],
        dayjs: "dayjs"
      }) // 完成css代码的抽离
    ]
  };
};
module.exports = function (env) {
  const isProduction = env.production;
  let mergeConfig = isProduction ? prodConfig : devConfig;
  return merge(getCommonConfig(isProduction), mergeConfig);
};
