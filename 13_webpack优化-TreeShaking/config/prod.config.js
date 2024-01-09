const path = require("path");

// glob用于匹配某个文件夹下所有的文件
//  pnpm add glob -D
const glob = require("glob");
/* 普通插件放入plugin，压缩插件放入minimizer之中，如CSSMinimizerPlugin和TerserPlugin */
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CSSMinimizerPlugin = require("css-minimizer-webpack-plugin");
// css的tree-shaking
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
module.exports = {
  mode: "development",
  devtool: false,

  // 优化配置
  optimization: {
    // 导入模块时，usedExports会分析模块中哪些函数有被使用到，哪些函数没有被使用到
    // 但是这里需要注释掉minize代码部分，才能看到对应的未引用说明的注释
    // 设置为false时，外部引入未使用的函数是不会被删掉的
    usedExports: true, //tree shaking 默认自动开启

    chunkIds: "deterministic",
    runtimeChunk: {
      name: "runtime"
    },
    splitChunks: {
      chunks: "all",
      minSize: 20,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          filename: "[id]-vendors.js"
        },
        utils: {
          test: /[\\/]utils[\\/]/,
          filename: "[id]-utils.js"
        }
      }
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false, //不生成LICENSE.txt文件
        terserOptions: {
          compress: {
            arguments: true
          },

          mangle: true,
          // 压缩变量名
          // toplevel: false
          // 保留函数名
          keep_fnames: true
        }
      }),
      new CSSMinimizerPlugin({})
    ]
  },
  plugins: [
    // 完成css代码的抽离
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[name].css"
    }),
    // 对CSS进行TreeShaking,去除未做应用的CSS样式
    new PurgeCSSPlugin({
      // 获取/src目录下的所有文件
      // nodir：no directory 说明需要遍历的文件不包含文件夹
      paths: glob.sync(`${path.resolve(__dirname, "../src")}/**/*`, { nodir: true })
      // 白名单设置
      // safelist: function () {
      //   return {
      //     standard: ["body"]
      //   };
      // }
    })
  ]
};
