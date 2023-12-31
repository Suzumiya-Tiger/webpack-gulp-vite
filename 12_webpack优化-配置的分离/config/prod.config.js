const path = require("path");
/* 普通插件放入plugin，压缩插件放入minimizer之中，如CSSMinimizerPlugin和TerserPlugin */
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CSSMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
  // 生产模式下会自动为被打包好的代码进行压缩
  mode: "production",
  // devtool会根据mode自动设置对应属性
  // devtool: false

  // 优化配置
  optimization: {
    // 针对splitChunks分包配置下占位插槽id的名称生成的chunkId的算法

    // development模式下默认配置为named=>生成的chunkId为文件名
    // production模式下默认配置为deterministic=>生成的chunkId为数字

    // 开发阶段使用named，因为可以方便查看对应的文件
    // 生产环境使用deterministic，因为可以方便进行缓存操作
    // deterministic可以生成一个确定的id，在重复打包时可以直接使用缓存，无需全部重新带包
    chunkIds: "deterministic",

    // runtime的代码是否单独抽取到单独的包中(runtime指的是模块的封装，抽取部分的功能代码)
    // 现在已经无需单独打包runtime了，基本已经默认封装进主包
    runtimeChunk: {
      name: "runtime"
    },
    // 运用了分包插件：SplitChunksPlugin
    splitChunks: {
      // 针对异步操作的分包内容：async
      // 全部的内容进行分包：all
      chunks: "all",
      /* 客制化内容 */
      // 当一个包大于指定的大小时，会继续进行拆包操作
      // (但是如果是一个整体包，就算大于指定大小也可能不会进行拆包操作)
      // maxSize: 20000, //这里的单位是字节
      // 拆包的时候将包拆分成不小于minSize的大小的包
      minSize: 20,

      // 自己对需要进行拆包的内容进行分组
      cacheGroups: {
        // 所有来自于node_modules的内容都会被打包到vendors组的包中
        vendors: {
          // 这里的正则写法是为了表示严格来自于node_modules，防止有其他文件同名的歧义
          test: /[\\/]node_modules[\\/]/,
          filename: "[id]-vendors.js"
        },
        // 所有来自于utils的内容都会被打包到utils组的包中
        // 如果对应文件小于minSize，那么会默认合并到主包之中，不会进行单独分包

        utils: {
          test: /[\\/]utils[\\/]/,
          filename: "[id]-utils.js"
        }
      }
    },
    // 生产模式下默认运用了webpack内置的代码优化插件：TerserPlugin
    // 该插件会让代码更加简洁=>Terser

    // minimize用于配置是否启用代码压缩
    minimize: true,
    // minimizer=>对代码进行缩减
    minimizer: [
      // JS压缩插件:TerserPlugin
      /* 不生效代码和未调用代码默认会自动被删除，除非设置unused为false */
      new TerserPlugin({
        // 是否生成LICENSE.txt文件，提取对应的第三方的注释信息
        extractComments: false, //不生成LICENSE.txt文件
        terserOptions: {
          compress: {
            // 对形参的传参进行优化，省去arguments的传参
            arguments: true
          },

          mangle: true,
          // 压缩变量名
          // toplevel: false
          // 保留函数名
          keep_fnames: true
        }
      }),
      // CSS压缩插件：CSSMinimizerPlugin
      // css压缩只能控制空格和换行的成本，不能随意变换变量名或者值
      new CSSMinimizerPlugin({
        // parallel:true 默认开启，无需手动打开
      })
    ]
  },
  plugins: [
    // 完成css代码的抽离
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[name].css"
    })
  ]
};
 