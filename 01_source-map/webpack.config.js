const path = require("path");
module.exports = {
  mode: "development",
  // development production
  // production生成的bundle文件会更加简洁

  // devtool本质上是一种调试工具
  devtool: "cheap-module-source-map",
  /**
   * 1.false 不生成sourcemap文件
   * 2.none production默认生成，不允许定义该属性
   * 3.eval development环境使用，占用性能小，不生成具体的sourcemap文件，可大概定义出错处
   * 4.source-map生成完整的source-map文件，精准还原具体的构成代码并生成文件，常用于production
   * development环境用eval足矣
   * 5.cheap-source-map(dev环境)：低开销，更高效
   * 6.cheap-module-source-map不会再打包后的source-map省去对应的空行，使得定位完全一致，非常精准
   * 7.hidden-source-map隐藏bundle.js的引导注释，需要用时重新加回来注释就行了
   */

  // 打包入口文件
  entry: "./src/main.js",
  // 打包出口文件
  output: {
    // 打包出口文件的文件名
    path: path.resolve(__dirname, "./build"),
    // filename即为打包出口文件的文件名
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
