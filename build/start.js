const { exec } = require('child_process')

exec('npm run dev:renderer')
setTimeout(() => {
  exec('npm run dev:main')
}, 10000)