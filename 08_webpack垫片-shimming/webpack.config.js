const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { ProvidePlugin } = require("webpack");
module.exports = {
  // 生产模式下会自动为被打包好的代码进行压缩
  mode: "production",
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts"]
  },
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name]-bundle.js",
    chunkFilename: "[name]-chunk.js",
    clean: true
  },
  devServer: {
    static: ["public"],
    liveReload: false,
    port: 80,
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
      new TerserPlugin({
        extractComments: false //不生成LICENSE.txt文件
      })
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    // ProvidePlugin 全局预设依赖，借此来引入第三方插件/库
    // bug:axios在该垫片应用中会导入一个模块，不能直接使用axios.get
    // 需要引用axios.default.get
    new ProvidePlugin({
      axios: ["axios", "default"],
      dayjs: "dayjs"
    })
  ]
};
