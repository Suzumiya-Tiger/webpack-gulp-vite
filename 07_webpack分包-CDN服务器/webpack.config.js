const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  // 生产模式下会自动为被打包好的代码进行压缩
  mode: "production",
  devtool: false,
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts"]
  },
  // 在使用CDN服务器加载第三方库包时，排除某些包不需要进行打包操作
  externals: {
    react: "React",
    // key属性名：排除的框架名称
    // import axios from 'axios' 排除框架的key属性名要和'axios'保持一致
    // 值属性名：必须严格等于官方框架引入资源的名称，具体以CDN为准，不允许自行定义
    axios: "axios"
  },
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./build"),
    // 以下操作步骤为手动分包
    // 利用placeholder来在[]中进行占位操作
    // name会根据不同的入口文件名称进行分类打包，生成对应的打包文件
    filename: "[name]-bundle.js",
    // 针对单独分包的文件进行命名
    chunkFilename: "[name]-chunk.js",
    clean: true
    // 配置publicPath可以为打包好的文件添加一个前缀路径，使得对打包资源的地址引入可以自动配置
    // publicPath:"CDN服务器地址"
  },
  devServer: {
    static: ["public"],
    liveReload: false,
    port: 80,
    compress: true,
    proxy: {
      "/api": {
        target: "http://139.199.212.233:8000/",
        pathRewrite: {
          "^/api": ""
        },

        changeOrigin: true
      }
    },
    historyApiFallback: true
  },
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
    })
  ]
};
