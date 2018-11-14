// 开机自启动
const { app } = require('electron')
const AutoLaunch = require('auto-launch')
let autoLaunch = () => {
  var minecraftAutoLauncher = new AutoLaunch({
    name: app.getName(),
    path: app.getPath('exe'),
  })

  minecraftAutoLauncher.enable()

  //minecraftAutoLauncher.disable()

  minecraftAutoLauncher.isEnabled()
    .then(function (isEnabled) {
      if (isEnabled) {
        return
      }
      minecraftAutoLauncher.enable()
    })
    .catch(function (err) {
      // handle error
    })
}

module.exports = autoLaunch