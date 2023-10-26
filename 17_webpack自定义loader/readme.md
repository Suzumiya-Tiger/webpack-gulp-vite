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