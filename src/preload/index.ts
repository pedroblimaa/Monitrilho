import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import lumi from 'lumi-control'

async function getMonitors(): Promise<void> {
  const monitors = lumi.monitors()
  console.log(monitors)
}

getMonitors()

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
