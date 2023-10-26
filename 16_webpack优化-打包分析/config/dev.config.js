module.exports = {
  // 生产模式下会自动为被打包好的代码进行压缩
  mode: "development",
  // devtool会根据mode自动设置对应属性
  // devtool: false

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

  plugins: []
};
