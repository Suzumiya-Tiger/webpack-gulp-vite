const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
/* 普通插件放入plugin，压缩插件放入minimizer之中，如CSSMinimizerPlugin和TerserPlugin */
const TerserPlugin = require("terser-webpack-plugin");
const { ProvidePlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CSSMinimizerPlugin = require("css-minimizer-webpack-plugin");
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
    filename: "js/[name]-bundle.js",
    chunkFilename: "js/[name]-chunk.js",
    clean: true
  },
  devServer: {
    static: ["public", "content"],
    liveReload: false,
    port: 8000,
    compress: true,
    proxy: {
      "/api": {
        target: "http://139.199.212.233:8000",
        pathRewrite: {
          "^/api": ""
        },

        changeOrigin: true
      }
    },
    historyApiFallback: true
  },
  optimization: {
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
    // 生产模式下默认运用了webpack内置的代码优化插件：TerserPlugin
    // 该插件会让代码更加简洁=>Terser

    // minimize用于配置是否启用代码压缩,设置true在开发环境也可以应用TerserPlugin配置
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
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new ProvidePlugin({
      axios: ["axios", "default"],
      dayjs: "dayjs"
    }), // 完成css代码的抽离
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[name].css"
    })
  ]
};
