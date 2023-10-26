const path = require("path");
const HtmlWbpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  devtool: false,
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js"
  },
  // resolveLoader:指定loader的解析路径
  resolveLoader: {
    modules: ["node_modules", "./hy-loaders"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "hybabel-loader"
            // options的内容会在对应的loader中去读取
            /*      options: {
              presets: ["@babel/preset-env"]
            } */
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        // pnpm add marked =>md文档的解析
        test: /\.md$/,
        use: {
          loader: "hymd-loader"
        }
      }
    ]
  },
  plugins: [new HtmlWbpackPlugin()]
};
