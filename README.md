# electron3 + webpack4 + vue2.5 多窗口（多页面）配置打包项目

该项目为electron + vue 多窗口项目配置打包解决方案

项目主要分为三个文件夹：

1. build文件夹：存放webpack4配置打包代码

2. main文件夹：存放electron主进程逻辑代码，里面自带开机自启动功能（autoLaunch）与自动检查更新功能(autoUpdater)， 自动更新功能要求使用electron-builder来打包

3. renderer文件夹：存放electron渲染进程逻辑代码，跟平时vue-cli生成的模板大致一样，可根据实际项目自己调整，但因为electron已窗口为主，所以webpack是通过遍历window下的文件夹生成一个数组然后再打包的，可根据自己实际需求更改对应代码（build/webpack.common.js）

npm命令主要分为4个：

1. npm run build:renderer 打包渲染进程
2. npm run build:main 打包主进程
3. npm run dev:renderer 开启渲染进程测试服务器 
4. npm run dev:main 开启主进程测试服务器

开启测试服务器必须先开启渲染进程再开启主进程，打包也是，所以在webpack种做出对应的逻辑代码，通过在监听webpack-dev-server的after，也就是等渲染进程完全开启服务后再启动主进程服务，然后通过webpack-shell-plugin模块监听webpack打包完渲染进程后再运行命令行打包主进程

如果只运行dev:renderer和build:renderer的话其实就是vue多页面的解决方案