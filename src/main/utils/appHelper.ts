import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import { Notification } from 'electron'
import { autoUpdater } from 'electron-updater'

import { join } from 'path'
import icon from '../../../resources/general-icon.png?asset'

export default class AppHelper {
  handleWindowShow(mainWindow: BrowserWindow): void {
    if (mainWindow.isVisible()) {
      mainWindow.hide()
      return
    }

    mainWindow.show()
    mainWindow.focus()
  }

  getWindowConfig(monitorCount: number): BrowserWindowConstructorOptions {
    console.log(monitorCount)

    return {
      width: 320,
      height: 55 * monitorCount + 50,
      show: false,
      autoHideMenuBar: true,
      icon,

      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      },
      frame: false
    }
  }

  handleAutoupdate(mainWindow: BrowserWindow): void {
    autoUpdater.on('update-available', () => {
      if (mainWindow) {
        this.showNotification('Update Available', 'A new update is available. Click to download', this.downloadUpdate)
      }
    })

    autoUpdater.on('update-downloaded', () => {
      if (mainWindow) {
        this.showNotification('Update Downloaded', 'Update Downloaded. Click to install.', this.update)
      }
    })

    autoUpdater.checkForUpdatesAndNotify()
  }

  showNotification(title: string, message: string, clickAction: () => void): void {
    const notificationOptions = {
      title,
      body: message,
      icon
    }

    new Notification(notificationOptions).on('click', clickAction).show()
  }

  configDevEnv(app: Electron.App, mainWindow: BrowserWindow): void {
    Object.defineProperty(app, 'isPackaged', {
      get() {
        return true
      }
    })

    autoUpdater.updateConfigPath = join(__dirname, '../../dev-app-update.yml')

    mainWindow.webContents.openDevTools()
  }

  configProdEnv(mainWindow: BrowserWindow): void {
    mainWindow.on('blur', () => {
      mainWindow.hide()
    })
  }

  private downloadUpdate(): void {
    autoUpdater.downloadUpdate()
  }

  private update(): void {
    autoUpdater.quitAndInstall()
  }
}
