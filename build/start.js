const { exec } = require('child_process')

exec('cross-env NODE_ENV=development webpack-dev-server --open --config build/webpack.dev.js')
setTimeout(() => {
  exec('cross-env NODE_ENV=development electron ./')
}, 10000)