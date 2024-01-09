/* 单纯地使用webpack包含模块化的内容(引入导出)，babel仅仅是对代码进行编译和转化 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  devtool: false,
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts"]
  },
  // 打包入口文件
  entry: "./src/index.js",
  // 打包出口文件
  output: {
    // 打包出口文件的文件名
    path: path.resolve(__dirname, "./build"),
    // filename即为打包出口文件的文件名
    filename: "bundle.js",
    clean: true
  },
  module: {
    rules: [
      // 处理jsx和js文件
      {
        test: /\.jsx?$/, //x?:存在一个或者零个x
        // 不处理node_modules下的文件
        exclude: /node_modules/,

        // 在webpack中结合使用Babel-loader对代码进行编译转化
        use: {
          loader: "babel-loader"
          /* 注意：options的配置移入babel.config.js单独配置文件进行配置 */
        }
      },
      // 利用ts-loader处理ts文件
      /* tips:
          在ts代码里面可能会包含了需要应用polyfill的代码
          ts-loader中的typescript complier(tsc)不包含polyfill
          所以不要用ts-loader直接编译ts代码
      */
      {
        test: /\.ts$/,
        // use: "ts-loader"
        // 利用babel-loader处理ts文件,但是我们需要安装一个ts的预设
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
