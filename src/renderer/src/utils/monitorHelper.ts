/* eslint-disable @typescript-eslint/no-explicit-any */
import { Monitor } from '@renderer/models/Monitor'

export default class MonitorHelper {
  lumi = (window as any).lumi

  async getMonitors(): Promise<Monitor[]> {
    const monitors = await this.lumi.monitors() // Get all monitors

    const mappedMonitors = await Promise.all(
      monitors.map(async monitor => {
        const { brightness } = await this.lumi.get(monitor.id)

        return {
          id: monitor.id,
          name: monitor.name,
          manufacturer: monitor.manufacturer,
          brightness,
          position: monitor.position
        }
      })
    )

    return mappedMonitors.sort(
      (a, b) => Math.abs(Number(a.position.x)) - Math.abs(Number(b.position.x))
    )
  }

  setBrightness(id: string, brightness: number): void {
    this.lumi.set({ [id]: brightness })
  }

  getMonitorsWithSpecificNames(monitors: Monitor[]): Monitor[] {
    return monitors.map(monitor => {
      const { name, manufacturer } = monitor
      monitor.displayName = name ? `${name} - ${manufacturer}` : manufacturer

      return monitor;
    })
  }

  getMonitorsWithStandardNames(monitors: Monitor[]): Monitor[] {
    return monitors.map((monitor, index) => {
      monitor.displayName = `Monitor ${index + 1}`
      return monitor;
    })
  }
}
