/* eslint-disable @typescript-eslint/no-explicit-any */
export const MONITOR_NAME_STYLE = 'monitorNameStyle'

export default class StoreHelper {
  public static set(name: string, value: any): void {
    const electronStore = (window as any).electronStore
    electronStore.set(name, value)
  }

  public static get(name: string): any {
    const electronStore = (window as any).electronStore
    return electronStore.get(name)
  }
}
