# CDN的配置

```js
  // 在使用CDN服务器加载第三方库包时，排除某些包不需要进行打包操作
  externals: {
    react: "React",
    // key属性名：排除的框架名称
    // import axios from 'axios' 排除框架的key属性名要和'axios'保持一致
    // 值属性名：必须严格等于官方框架引入资源的名称，具体以CDN为准，不允许自行定义
    axios: "axios"
  }

```

首先在webpack.config.js里面排除掉无需打包的第三方包，然后在index.html里面的script标签写入引入CDN的地址。