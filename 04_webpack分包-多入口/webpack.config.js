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
    index: {
      import: "./src/index.js",
      // 指定需要使用的共享包
      dependOn: "shared"
    },
    main: {
      import: "./src/main.js",
      dependOn: "shared"
    },
    //指定共享的第三方包，防止多次引用引起性能浪费
    // shared可以以不同的属性名写入多个
    shared: ["axios", "react", "react-dom"]
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
