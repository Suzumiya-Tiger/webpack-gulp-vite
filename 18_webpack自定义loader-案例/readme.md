## 自定义loader

![image-20230922014432891](C:\Users\XANA\AppData\Roaming\Typora\typora-user-images\image-20230922014432891.png)

resolveLoader默认存入node_modules，导致rules的use配置会默认查找node_modules，使得自定义loader还需要写绝对路径的地址。

所以我们需要自己搭建一个目录，使得loader的查找有多一个索引目录，从而简化代码的书写长度

![image-20230922014619224](C:\Users\XANA\AppData\Roaming\Typora\typora-user-images\image-20230922014619224.png)

而entry或者rules的路径和context相关，这个无需配置，默认是根路径。

![image-20230922014809574](C:\Users\XANA\AppData\Roaming\Typora\typora-user-images\image-20230922014809574.png)

pitchLoader的优先执行

![image-20230922032341694](C:\Users\XANA\AppData\Roaming\Typora\typora-user-images\image-20230922032341694.png)

![image-20230922032940243](C:\Users\XANA\AppData\Roaming\Typora\typora-user-images\image-20230922032940243.png)

![image-20230922032949961](C:\Users\XANA\AppData\Roaming\Typora\typora-user-images\image-20230922032949961.png)

### loader的异步操作

![image-20230922192101894](C:\Users\XANA\AppData\Roaming\Typora\typora-user-images\image-20230922192101894.png)

`babel.transform` 是一个异步操作，因为它可能会涉及到耗时的任务，比如解析大量的代码、应用转换规则等。在处理大规模的代码时，这个过程可能会花费一定的时间。

如果 `babel.transform` 是一个同步操作，它将会阻塞整个 Webpack 构建过程，直到转换完成才会继续往下执行。这将导致构建过程变得非常缓慢，特别是当处理大量代码时。

因此，`babel.transform` 被设计成一个异步函数，允许它在后台执行转换过程，而不会阻塞 Webpack 的构建。这样，其他任务可以在转换进行的同时继续执行。

异步操作的常见例子包括文件读取、网络请求、定时器等，它们都需要一定的时间来完成。在这段代码中，`babel.transform` 可能需要一些时间来对源代码进行转换，因此它是一个异步操作。