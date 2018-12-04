const { exec } = require('child_process')

const webpack = require('webpack')

const merge = require('webpack-merge')
const common = require('./webpack.common.js')

const utils = require('./util.js')

module.exports = merge(common, {
  devServer: {
    contentBase: utils.resolve('../dist'),
    host: 'localhost',
    // useLocalIp: true,
    overlay: {
      errors: true,
      warnings: true
    },
    open: true,
    hot: true,
    port: 8080,
    historyApiFallback: true,
    inline: true,
    disableHostCheck: true,
    stats: {
      assets: false,
      chunks: false,
      chunkGroups: false,
      chunkModules: false,
      chunkOrigins: false,
      modules: false,
      moduleTrace: false,
      source: false,
      builtAt: false,
      children: false,
      hash: false,
    },
    index: 'login.html', // 将login页面设置为index页面
    after: function() {
      exec('npm run dev:main') // renderer服务启动后启动main服务
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
})