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
    index: 'login.html',
    after: function() {
      exec('npm run dev:main')
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
})