const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  // 生产模式下会自动为被打包好的代码进行压缩
  mode: "development",
  devtool: false,
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts"]
  },
  /* 使用[hash]模式，原代码不做更改，hash值不发生任何变化，一旦变更了代码，那么打包后的文件hash值会进行变化 */

  /* [hash]的本质就是对文件内的代码进行内容摘要，只要内容不变hash就不变,如果针对多入口文件进行打包，
    那么在其中一个文件进行代码改变的情况下，另外一个打包文件的hash也会变，因为他们两个默认用同一个hash值，
    这会导致性能浪费，不利于浏览器进行缓存 */

  /* 为了解决上述问题，我们选用[contenthash]，也推荐使用contenthash，
    contenthash只针对变更代码内容的文件进行hash值的变更 */
  /* [chunkhash]也可以有contenthash的效果，它会根据不同的入口来解析生成hash的值 */
  entry: {
    index: "./src/index.js",
    main: "./src/main.js"
  },
  output: {
    path: path.resolve(__dirname, "./build"),
    // 以下操作步骤为手动分包
    // 利用placeholder来在[]中进行占位操作
    // name会根据不同的入口文件名称进行分类打包，生成对应的打包文件
    filename: "[name]_[contenthash]-bundle.js",
    chunkFilename: "[name]_[contenthash]-chunk.js",
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 为打包后的css文件进行重命名
      filename: "[name]_[contenthash].css"
    })
  ]
};
