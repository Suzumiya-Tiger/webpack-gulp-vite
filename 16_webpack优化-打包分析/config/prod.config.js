const path = require("path");
const webpack = require("webpack");
// glob用于匹配某个文件夹下所有的文件
//  pnpm add glob -D
const glob = require("glob");
/* 普通插件放入plugin，压缩插件放入minimizer之中，如CSSMinimizerPlugin和TerserPlugin */
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CSSMinimizerPlugin = require("css-minimizer-webpack-plugin");
// css的tree-shaking
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
// 打包文件分析
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
module.exports = {
  // 生产模式下会自动为被打包好的代码进行压缩
  mode: "production",
  // devtool会根据mode自动设置对应属性
  // devtool: false

  // 优化配置
  optimization: {
    // 导入模块时，usedExports会分析模块中哪些函数有被使用到，哪些函数没有被使用到
    // 但是这里需要注释掉minize代码部分，才能看到对应的未引用说明的注释
    // 设置为false时，外部引入未使用的函数是不会被删掉的
    usedExports: true, //tree shaking 默认自动开启

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
    }),
    // 作用域提升,会分析哪些模块作用域可以进行提升
    /* demo示例就是把math里面的sum直接提升到导入的demo中进行调用 */
    // 如果在production模式下，会自动开启ModuleConcatenationPlugin，无需手动设置
    new webpack.optimize.ModuleConcatenationPlugin(),

    // 对打包后的文件(js/css)进行压缩
    new CompressionPlugin({
      test: /\.js$|\.css$/,
      // minRatio:0.8, 此项为压缩比例最小值，压缩结果大于该值才会压缩，默认值是0.8，默认自动启用该数值
      algorithm: "gzip"
    }),
    new BundleAnalyzerPlugin()
  ]
};
