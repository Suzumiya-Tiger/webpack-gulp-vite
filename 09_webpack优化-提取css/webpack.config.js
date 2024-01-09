const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { ProvidePlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  devtool: false,
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts"]
  },
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "js/[name]-bundle.js",
    chunkFilename: "js/[name]-chunk.js",
    clean: true
  },
  devServer: {
    static: ["public", "content"],
    liveReload: false,
    port: 8000,
    compress: true,
    proxy: {
      "/api": {
        target: "http://139.199.212.233:8000",
        pathRewrite: {
          "^/api": ""
        },

        changeOrigin: true
      }
    },
    historyApiFallback: true
  },
  // 优化配置
  optimization: {
    chunkIds: "deterministic",
    runtimeChunk: {
      name: "runtime"
    },
    splitChunks: {
      chunks: "all",
      minSize: 20,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          filename: "[id]-vendors.js"
        },
        utils: {
          test: /[\\/]utils[\\/]/,
          filename: "[id]-utils.js"
        }
      }
    },
    minimizer: [
      // JS代码简化
      new TerserPlugin({
        extractComments: false //不生成LICENSE.txt文件
      })
      // CSS代码简化
    ]
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
          // compiles Less to CSS
          // MiniCssExtractPlugin.loader是以link的形式插入到index.html之中，常用于生产环境
          MiniCssExtractPlugin.loader,
          // style-loader是以style内联的形式插入到index.html之中,常用于开发环境
          // "style-loader",
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
    }),
    // 完成css的提取
    new MiniCssExtractPlugin({
      filename: "css/[name]-[contenthash].css",
      // 动态导入的css文件名
      chunkFilename: "css/[name]-[contenthash]_chunk.css"
    })
  ]
};
