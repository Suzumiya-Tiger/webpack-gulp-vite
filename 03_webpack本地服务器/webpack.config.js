/* 单纯地使用webpack包含模块化的内容(引入导出)，babel仅仅是对代码进行编译和转化 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  devtool: false,
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts"]
  },
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./build"),
    // filename即为打包出口文件的文件名
    filename: "bundle.js",
    clean: true
  },
  // 配置本地服务器
  /* 
  devServer中的static对于我们直接访问打包后的资源没什么用，主要用于打包后的资源又依赖于其他资源，
  那么这个其他资源就可以放在static里面，这样就可以直接访问了
  */
  devServer: {
    // static是静态资源的意思，这里指定了静态资源的目录
    // static:['public']
    // 就算不写，也是默认从public文件夹里面找静态资源文件
    static: ["public", "content"],
    // 编译失败后不重新刷新整个页面，而是更新对应错误部分的代码
    liveReload: false,
    // host 改为0.0.0.0 可以使其他人通过本机Ip地址进行访问
    // host:0.0.0.0

    // 设置端口号
    port: 8133,
    // 是否自动打开浏览器
    open: true,
    // compress可以对所有的服务器资源采用gzip压缩
    compress: true,
    proxy: {
      // 当请求的路径是以/api开头的时候，就会触发代理机制
      "/api": {
        target: "http://localhost:9000",
        pathRewrite: {
          "^/api": ""
        },
        // changeOrigin是为了在发送请求给目标服务器的时候，把请求头中的host字段改为目标服务器的地址，
        // 解决服务器校验host的拦截问题
        changeOrigin: true
      }
    },
    historyApiFallback: true
  },
  module: {
    rules: [
      // 处理jsx和js文件
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        // 在webpack中结合使用Babel-loader对代码进行编译转化
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
