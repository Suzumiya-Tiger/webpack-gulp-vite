const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js"
  },
  // resolveLoader:指定loader的解析路径
  resolveLoader: {
    modules: ["node_modules", "./custom-loaders"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // 默认输出内容从后往前依次执行
        // pitch从前往后先后执行
        use: [
          /* "hy_loader01", "hy_loader02", "hy_loader03" */
          // 给Loader传递参数
          {
            loader: "hy_loader04",
            options: {
              name: "why",
              age: 18
            }
          }
        ]
      }
      /* 通过enforce来改变loader的执行顺序 */
      /*      {
        test: /\.js$/,
        use: "hy_loader01"
      },
      {
        test: /\.js$/,
        use: "hy_loader02",
        enforce: "pre"
      },
      {
        test: /\.js$/,
        enforce: "post",
        use: "hy_loader03"
      } */
    ]
  }
};
