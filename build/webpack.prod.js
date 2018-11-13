const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const glob = require('glob')
const PurifyCSSPlugin = require('purifycss-webpack') // 去掉没有用过的css
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin')//复制粘贴文件的插件

const utils = require('./util.js')

const merge = require('webpack-merge')
const common = require('./webpack.common.js')
module.exports = merge(common, {
  externals: {
    // 'vue': 'Vue',
    // 'element-ui': 'ElementUI',
    // 'vue-router': 'Router',
    // 'vuex': 'Vuex',
    // 'qs': 'qs',
    // 'axios': 'axios',
    // 'jquery': '$',
  },
  // 这里需要将vue和vue-router公开出去，供全局使用，这里小写的(即冒号左边的)vue和vue-router是我们引入资源时对应的名字，冒号右面的是由库的主人暴露出来的全局方法名
  // 但在项目中移除import引入，例如import Vue from 'vue'，直接移除就行
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          safe: true,
          autoprefixer: { disable: true }, // 这里是个大坑，稍后会提到
          mergeLonghand: false,
          discardComments: {
            removeAll: true // 移除注释
          }
        },
        canPrint: true
      })
    ],
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(), // 文件没变的话打包出来的hash值不会变化（跟上次一样）
    new CleanWebpackPlugin(['dist'], {
      root: utils.resolve('../')
    }),
    // new PurifyCSSPlugin({
    //   paths: glob.sync(path.join(__dirname, 'src/*.vue'))
    // }),
    // new CopyWebpackPlugin([//拷贝文件到打包文件目录下的插件
    //   {
    //     from: utils.resolve('./static'),//复制来自于static
    //     to: utils.resolve('./dist'),//粘贴到dist文件下static
    //     ignore: ['.*']
    //   }
    // ]),
    // new BundleAnalyzerPlugin()
  ],
})