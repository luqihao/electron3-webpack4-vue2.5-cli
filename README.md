# electron3 + webpack4 + vue2.5 多页面（多窗口）配置打包项目

该项目是为了之后开发即时通讯项目而准备的，因为之前没接触过webpack，正好借此机会学一学

因为即时通讯项目想用vuetify，并且vuetify使用stylus进行css预处理的，所以package.json里面也配置了vuetify和stylus

配置代码都在build文件夹下面，主要应用于vue多页面（对应electron多窗口）配置解决方案（其实单页面的话只要在page文件夹下创建一个文件夹就行了），配置代码都很简单（水平有限），可以根据自己项目实际需求改造一下