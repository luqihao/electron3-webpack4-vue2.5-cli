// 自动更新
const { autoUpdater } = require('electron-updater')

const feedUrl = `http://localhost:9000/autoUpdater` //该路径是更新文件所在服务器地址

let sendUpdateMessage = (message, data) => {
  chatWin.webContents.send('updateMessage', { message, data })
}

let checkForUpdates = () => {
  autoUpdater.setFeedURL(feedUrl)

  autoUpdater.on('error', function (message) {
    sendUpdateMessage('error', message)
  })
  autoUpdater.on('checking-for-update', function (message) {
    sendUpdateMessage('checking-for-update', message)
  })
  autoUpdater.on('update-available', function (message) {
    sendUpdateMessage('update-available', message)
  })
  autoUpdater.on('update-not-available', function (message) {
    sendUpdateMessage('update-not-available', message)
  })

  // 更新下载进度事件
  autoUpdater.on('download-progress', function (progressObj) {
    sendUpdateMessage('downloadProgress', progressObj)
  })
  autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
    ipcMain.on('updateNow', (e, arg) => {
      //some code here to handle event
      autoUpdater.quitAndInstall()
    })
    sendUpdateMessage('isUpdateNow')
  })

  //执行自动更新检查
  autoUpdater.checkForUpdates()
}

module.exports = checkForUpdates