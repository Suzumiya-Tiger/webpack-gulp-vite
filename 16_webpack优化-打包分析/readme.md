## SpeedMeasurePlugin

mini-css-extract-plugin版本过高会导致swp.wrap()运行报错，降低插件版本即可

pnpm add mini-css-extract-plugin@1.3.6 -D



pnpm run build打包后会打印出时间

![image-20230920171121480](C:\Users\XANA\AppData\Roaming\Typora\typora-user-images\image-20230920171121480.png)



经查纠发现，node_modules作为第三方库引入时已经进行了压缩处理，无需再进行处理了，故在module=>rules里面具体的文件类型配置中可以在exclude中忽略node_modules

![image-20230920171417740](C:\Users\XANA\AppData\Roaming\Typora\typora-user-images\image-20230920171417740.png)

## 查看打包文件大小

pnpm add webpack-bundle-analyzer -D

在prod.config.js进行配置，同时在package.json中做以下配置：

```js
// 打包文件分析
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
......
......
  plugins: [
    new BundleAnalyzerPlugin()
  ]
```

打包后会自动打开一个网站分析打包后文件大小。