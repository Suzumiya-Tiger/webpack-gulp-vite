# 提取CSS文件

默认情况下，css文件并不会做到单独提取和打包，并且webpack也不会自动处理css文件。

首先我们需要保证css能够正常被识别和应用，所以需要安装两个(或者N个)插件来处理css：

`npm install style-loader css-loader -D`

```js
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          // style-loader是以style内联的形式插入到index.html之中,常用于开发环境
           "style-loader",
          "css-loader",
          "less-loader"
        ]
      }
    ]
  },
```

谨记，loader的执行顺序是相反的。

## CSS的提取和打包

安装mini-css-extract-plugin

`npm install mini-css-extract-plugin`

在webpack.config.js首部导入该插件

`const MiniCssExtractPlugin = require("mini-css-extract-plugin");`

在plugins定义MiniCssExtractPlugin的配置，注意这里会把less打包为css格式。

```js
  plugins: [
    // 完成css的提取
    new MiniCssExtractPlugin({
      filename: "css/[name]-[contenthash].css",
      // 动态导入的css文件名
      chunkFilename: "css/[name]-[contenthash]_chunk.css"
    })
  ]
```

**注意，这里的css/代表打包文件会放在打包后的单独的css文件目录下。js分包文件也可以通过这种方式达成单独目录。** 

因为style-loader使用内联样式插入到index.html里面的，如果我们能够利用MiniCssExtractPlugin 提取css代码，就无需style-loader了，所以可以对webpack.config.js进行修改：

```js
  module: {
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          // MiniCssExtractPlugin.loader是以link的形式插入到index.html之中，常用于生产环境
          MiniCssExtractPlugin.loader,
          // style-loader是以style内联的形式插入到index.html之中,常用于开发环境
          // "style-loader",
          "css-loader",
          "less-loader"
        ]
      }
    ]
  },
```

MiniCssExtractPlugin 利用link元素插入到html里面，在生产环境使用这种配置即可。

`  <link href="css/main.css" rel="stylesheet" />`