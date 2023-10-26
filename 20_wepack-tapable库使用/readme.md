![image-20230922183316004](C:\Users\XANA\AppData\Roaming\Typora\typora-user-images\image-20230922183316004.png)

同步(sync)和异步(async)可以结合其它特性关键字，生成对应特性的hook，见下面的标题详解。

### SyncBailHook

![image-20230922182144489](C:\Users\XANA\AppData\Roaming\Typora\typora-user-images\image-20230922182144489.png)

bailhook的监听事件如果里面有返回值，那么后续事件将不再执行

### SyncLoopHook

![image-20230922182545567](C:\Users\XANA\AppData\Roaming\Typora\typora-user-images\image-20230922182545567.png)

监听事件回调函数的返回值为true时，循环执行该回调函数

### SyncWaterFallHook

返回的值存在时，将作为下一个监听事件回调函数的第一个传参。

![image-20230922183057955](C:\Users\XANA\AppData\Roaming\Typora\typora-user-images\image-20230922183057955.png)



### AsyncParalleHook

![image-20230922185944005](C:\Users\XANA\AppData\Roaming\Typora\typora-user-images\image-20230922185944005.png)

利用callback来串行执行对应的回调函数，属于层层串连的回调执行。

最后执行的就是调用钩子的callAsync函数，代表所有回调执行完毕。