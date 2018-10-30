const path = require('path')
const webpack = require('webpack')

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    host: "0.0.0.0",
    useLocalIp: true,
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
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
})