export interface Monitor {
  id: string
  name: string
  displayName: string
  manufacturer: string
  brightness: number
  position: { x: string; y: string }
}

export enum MonitorNameMode {
  DEFAULT = 'DEFAULT',
  SPECIFIC = 'SPECIFIC'
}
