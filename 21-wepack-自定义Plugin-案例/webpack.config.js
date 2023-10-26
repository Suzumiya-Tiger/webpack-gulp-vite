const path = require("path");
const HtmlwebpackPlugin = require("html-webpack-plugin");
const AutoUploadWebpackPlugin = require("./plugins/AutoUploadWebpackPlugin");
const { PASSWORD, SERVER_HOST, USER_NAME, REMOTE_PATH } = require("./plugins/config");
module.exports = {
  mode: "production",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js"
  },
  plugins: [
    new HtmlwebpackPlugin(),
    new AutoUploadWebpackPlugin({
      host: SERVER_HOST,
      username: USER_NAME,
      password: PASSWORD,
      remotePath: REMOTE_PATH
    })
  ]
};
