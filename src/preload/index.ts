/* eslint-disable @typescript-eslint/no-explicit-any */
import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge } from 'electron'
import lumi from 'lumi-control'
import Store from 'electron-store'

// Custom APIs for renderer
const api = {}
const store = new Store();

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('lumi', lumi)
    contextBridge.exposeInMainWorld('electronStore', {
      get: (key: string) => store.get(key),
      set: (key: string, value: any) => store.set(key, value),
      delete: (key: string) => store.delete(key),
      clear: () => store.clear()
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
