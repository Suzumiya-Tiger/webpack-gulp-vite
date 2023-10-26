const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ProvidePlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");
const devConfig = require("./dev.config");
const prodConfig = require("./prod.config");

/**
 *
 * @param {*} isProduction 是否是生产环境
 * @returns 公用文件配置
 *
 * 抽取开发和生产环境的配置文件
 * 1.将配置文件导出的方式改为函数的形式，该函数接收一个参数isProduction，用于判断是否是生产环境
 * 2.从上向下查看所有的配置文件，将开发环境和生产环境的配置文件中相同的配置抽取出来，放入公用配置文件
 * 3.针对单独的配置文件进行定制配置
 * css加载：使用不同的loader可以根据isProduction动态获取
 * 4.最后再利用webpack-merge插件将公用配置文件和开发/生产配置文件进行合并
 */

const getCommonConfig = function (isProduction) {
  return {
    resolve: {
      extensions: [".js", ".jsx", ".json", ".ts"]
    },
    // 排除某些包不需要进行打包操作
    /*   externals: {
    react: "React",
    // key属性名：排除的框架名称
    // import axios from 'axios' 排除框架的key属性名要和'axios'保持一致
    // 值属性名：必须严格等于官方框架引入资源的名称，具体以CDN为准，不允许自行定义
    axios: "axios"
  }, */

    // 测试TerserPlugin
    entry: "./src/demo.js",
    // entry: "./src/main.js",
    output: {
      path: path.resolve(__dirname, "../build"),
      // 以下操作步骤为手动分包
      // 利用placeholder来在[]中进行占位操作
      // name会根据不同的入口文件名称进行分类打包，生成对应的打包文件
      filename: "js/[name]-bundle.js",
      // 针对单独分包的文件进行命名
      chunkFilename: "js/[name]-chunk.js",
      clean: true
      // 配置publicPath可以为打包好的文件添加一个前缀路径，使得对打包资源的地址引入可以自动配置
      // publicPath:"CDN服务器地址"
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
        },
        {
          test: /\.less$/i,
          use: [
            // compiles Less to CSS
            // MiniCssExtractPlugin.loader是以link的形式插入到index.html之中，常用于生产环境
            // MiniCssExtractPlugin.loader,
            // style-loader是以style内联的形式插入到index.html之中,常用语开发环境
            // "style-loader",

            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "less-loader"
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        // 压缩文件无变化则不重复生成
        cache: true,
        // 默认开启该选项，该选项在生产环境下会进行压缩
        minify: isProduction
          ? {
              // 压缩时移除注释
              removeComments: true,
              // 压缩时移除空属性=>    <div class=""></div>
              removeEmptyAttributes: true,
              // 移除默认的没啥用的属性=>  <input type="text" />
              removeRedundantAttributes: true,
              // 移除空行，折叠空白字符
              collapseWhitespace: true,
              // 压缩内联的CSS
              minifyCSS: true,
              // 压缩JavaScript
              minifyJS: {
                mangle: {
                  // 压缩变量名
                  toplevel: true
                }
              }
            }
          : false
      }),
      // ProvidePlugin 全局预设依赖，借此来引入第三方插件/库

      // bug:axios在该垫片应用中会导入一个模块，不能直接使用axios.get
      new ProvidePlugin({
        axios: ["axios", "default"],
        dayjs: "dayjs"
      }) // 完成css代码的抽离
    ]
  };
};

/* 
    "build": "webpack --config ./config/comm.config.js --env production",
    "serve": "webpack serve --config ./config/comm.config.js --env development" 
*/
// webpack允许导出一个函数，该函数可以接收一个参数env
// env可以从package.json里面的指令中写入和获取，格式为--env xxxxxx
module.exports = function (env) {
  const isProduction = env.production;
  let mergeConfig = isProduction ? prodConfig : devConfig;
  // 安装webpack-merge插件=>pnpm add webpack-merge -D
  // 利用webpack-merge插件的merge合并开发、生产、共用的webpack配置
  return merge(getCommonConfig(isProduction), mergeConfig);
};
