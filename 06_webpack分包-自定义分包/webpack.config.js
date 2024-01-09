const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  // 生产模式下会自动为被打包好的代码进行压缩
  mode: "production",
  devtool: false,
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts"]
  },
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name]-bundle.js",
    // 针对单独分包的文件进行命名
    chunkFilename: "[name]-chunk.js",
    clean: true
  },
  devServer: {
    static: ["public", "content"],
    liveReload: false,
    port: 3000,
    compress: true,
    proxy: {
      "/api": {
        target: "http://localhost:9000",
        pathRewrite: {
          "^/api": ""
        },

        changeOrigin: true
      }
    },
    historyApiFallback: true
  },
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

    // minimizer=>对代码进行缩减
    minimizer: [
      // JS代码简化
      new TerserPlugin({
        // 是否生成LICENSE.txt文件，提取对应的第三方的注释信息
        extractComments: false //不生成LICENSE.txt文件
      })
      // CSS代码简化
    ]
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ]
};
