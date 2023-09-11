const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  devtool: false,
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts"]
  },
  // entry: "./src/index.js",
  // 配置多入口
  entry: {
    index: "./src/index.js",
    main: "./src/main.js",
    //指定共享的第三方包，防止多次引用引起性能浪费
    shared:['axios','dayjs']
  },

  output: {
    path: path.resolve(__dirname, "./build"),
    // 以下操作步骤为手动分包
    // 利用placeholder来在[]中进行占位操作
    // name会根据不同的入口文件名称进行分类打包，生成对应的打包文件
    filename: "[name]-bundle.js",
    clean: true
  },
  devServer: {
    static: ["public", "content"],
    liveReload: false,
    port: 3000,
    compress: true,
    proxy: {
      "/api": {
        target: "http://localhost:9000",
        pathRewrite: {
          "^/api": ""
        },

        changeOrigin: true
      }
    },
    historyApiFallback: true
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
