import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, ipcMain, Menu, nativeTheme, shell, Tray, screen } from 'electron'
import path, { join } from 'path'
import AppHelper from './utils/appHelper'
import { autoUpdater } from 'electron-updater'
import Store from 'electron-store'

let mainWindow: BrowserWindow
const gotTheLock = app.requestSingleInstanceLock()
const appHelper = new AppHelper()

autoUpdater.autoDownload = false

function createTray(): void {
  const isDarkTheme = nativeTheme.shouldUseDarkColors
  const iconName = isDarkTheme ? 'light-icon.png' : 'dark-icon.png'
  const tray = new Tray(path.join(__dirname, `../../resources/${iconName}`))

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open', click: () => appHelper.handleWindowShow(mainWindow) },
    { type: 'separator' },
    { label: 'Exit', click: handleQuit }
  ])

  tray.on('click', () => appHelper.handleWindowShow(mainWindow))

  tray.setToolTip('Lumi Control')
  tray.setContextMenu(contextMenu)
}

function handleQuit(): void {
  mainWindow.removeAllListeners()
  app.quit()
}

function createWindow(): void {
  const monitorCount = screen.getAllDisplays().length
  mainWindow = new BrowserWindow(appHelper.getWindowConfig(monitorCount))

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('close', event => {
    event.preventDefault()
    mainWindow.hide()
  })

  mainWindow.webContents.setWindowOpenHandler(details => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  !is.dev ? appHelper.configProdEnv(mainWindow) : appHelper.configDevEnv(app, mainWindow)

  loadMainWindowContent(mainWindow)

  Store.initRenderer()
  appHelper.handleAutoupdate(mainWindow)
}

function loadMainWindowContent(mainWindow: BrowserWindow): void {
  is.dev && process.env['ELECTRON_RENDERER_URL']
    ? mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    : mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
}

function handleLock(): void {
  if (!gotTheLock) {
    app.quit()
    return
  }

  app.on('second-instance', () => {
    console.log('second-instance')
    if (mainWindow) {
      appHelper.handleWindowShow(mainWindow)
    }
  })
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('Monitrilho')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  createTray()
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

handleLock()
