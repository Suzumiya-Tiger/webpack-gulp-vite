const { NodeSSH } = require("node-ssh");
class AutoUploadWebpackPlugin {
  constructor(options) {
    // pnpm add node-ssh -D
    this.ssh = new NodeSSH();
    //   options作为被传递的参数
    this.options = options;
  }
  //插件的注册需要依赖内置的apply方法
  apply(compiler) {
    console.log("AutoUploadWebpackPlugin被注册");
    //   完成的事情：注册hooks监听事件
    // 该插件触发的时机：等待assets输出到output目录上时，完成自动上传的功能
    // webpack官网叙述了afterEmit是一个输出assets到output目录之后执行的hook，这正是一个好时机
    // afterEmit是一个异步hook
    compiler.hooks.afterEmit.tapAsync("AutoPlugin", async (compilation, callback) => {
      // 1.获取输出的文件夹路径(其中的资源)
      const outputPath = compilation.outputOptions.path;
      console.log(outputPath);
      
      //   2.连接远程服务器SSH
      await this.connectServer();
      //   3.删除原有的文件夹内容
      const remotePath = this.options.remotePath;
      this.ssh.execCommand(`rm -rf ${remotePath}/*`);
      //   4.将文件夹中的资源上传到服务器中
      await this.uploadFiles(outputPath, remotePath);

      // 5.关闭ssh连接
      this.ssh.dispose();
      //   完成所有操作后需要调用callback，不理解就回头看第20章
      callback();
    });
  }

  async connectServer() {
    await this.ssh.connect({
      host: this.options.host,
      username: this.options.username,
      password: this.options.password
    });
    console.log("服务器连接成功");
  }

  async uploadFiles(localPath, remotePath) {
    //   将本地目录文件上传到远程服务器指定目录
    const status = await this.ssh.putDirectory(localPath, remotePath, {
      // 递归上传
      recursive: true,
      // 并发上传
      concurrency: 10
    });
    //   上传成功
    if (status) {
      console.log("文件上传服务器成功");
    }
  }
}
module.exports = AutoUploadWebpackPlugin;
module.exports.AutoUploadWebpackPlugin = AutoUploadWebpackPlugin;
