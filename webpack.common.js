const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//webpack默认在node上面是单进程 所以我们打包时间比较慢 我们可以用这个文件来配置多进程 提高效率
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })//获取cpu的数量

// var website = {
//   publicPath: "http://localhost:8080/"
//   // publicPath:"http://192.168.1.103:8888/"
// }
console.log('*****')
console.log(process.env.NODE_ENV)
console.log('*****')
module.exports = {
  mode: process.env.NODE_ENV, // development or production
  devtool: process.env.NODE_ENV === 'development' ? 'cheap-module-eval-source-map' : 'source-map',
  entry: {
    main1: './src/main1.js',
    main2: './src/main2.js',
    vendor: ['vue', 'element-ui', 'vue-router']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash:8].js',
    // publicPath: 'dist'  //publicPath：主要作用就是处理静态文件路径的。
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'src': path.resolve(__dirname, './src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/, // 处理vue模块
        use: 'vue-loader',
      },
      {
        test: /\.(png|jpg|gif|jpeg)/,  //是匹配图片文件后缀名称
        use: [{
          loader: 'url-loader', //是指定使用的loader和loader的配置参数
          options: {
            limit: 10000,  //是把小于500B的文件打成Base64的格式，写入JS
            outputPath: 'images/',
          }
        }],
      },
      {
        test: /\.(htm|html)$/i,
        use: ['html-withimg-loader']
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'media/',
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'font/',
        }
      },
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=happyBabel',
        include: [path.resolve(__dirname, './src')]
      },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              // sourceMap: true,
              plugins: [
                require('autoprefixer') /*在这里添加*/
              ]
            }
          }
        ],
      },
      {
        test: /\.less$/,
        use: [
          process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                require('autoprefixer') /*在这里添加*/
              ]
            }
          },
          'less-loader',
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: { //是对html文件进行压缩
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      filename: 'index.html',
      title: '首页',
      hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
      template: path.resolve(__dirname, './index.html'), //是要打包的html模版路径和文件名称。
      chunks: ['main1', 'vendor']
    }),
    new HtmlWebpackPlugin({
      minify: { //是对html文件进行压缩
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      filename: 'otherpage.html',
      title: '其他页',
      hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
      template: path.resolve(__dirname, './index.html'), //是要打包的html模版路径和文件名称。
      chunks: ['main2', 'vendor']
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      // chunkFilename: '[name].css'
    }),
    new VueLoaderPlugin(),
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: 'happyBabel',
      //如何处理  用法和loader 的配置一样
      loaders: [{
        loader: 'babel-loader?cacheDirectory=true',
      }],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true,
    })
  ],
}