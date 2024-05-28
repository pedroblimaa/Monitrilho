import {
  app,
  shell,
  BrowserWindow,
  ipcMain,
  Tray,
  Menu,
  BrowserWindowConstructorOptions,
  nativeTheme
} from 'electron'
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/general-icon.png?asset'

let mainWindow: BrowserWindow
const gotTheLock = app.requestSingleInstanceLock()

function createTray(): void {
  const isDarkTheme = nativeTheme.shouldUseDarkColors
  const iconName = isDarkTheme ? 'light-icon.png' : 'dark-icon.png'
  const tray = new Tray(path.join(__dirname, `../../resources/${iconName}`))

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open', click: handleWindowShow },
    { type: 'separator' },
    { label: 'Exit', click: handleQuit }
  ])

  tray.on('click', handleWindowShow)

  tray.setToolTip('Lumi Control')
  tray.setContextMenu(contextMenu)
}

function handleQuit(): void {
  mainWindow.removeAllListeners()
  app.quit()
}

function handleWindowShow(): void {
  if (mainWindow.isVisible()) {
    mainWindow.hide()
    return
  }

  mainWindow.show()
  mainWindow.focus()
}

function createWindow(): void {
  mainWindow = new BrowserWindow(getWindowConfiguration())

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

  if (!is.dev) {
    mainWindow.on('blur', () => {
      mainWindow.hide()
    })
  }

  loadMainWindowContent(mainWindow)
}

function getWindowConfiguration(): BrowserWindowConstructorOptions {
  return {
    width: 250,
    height: 160,
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
      handleWindowShow()
    }
  })
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

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
