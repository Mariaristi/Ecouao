export type AlertLevel = 'ok' | 'warn' | 'danger'

export interface SensorReading {
  timestamp: string
  temperature: number
  humidity: number
  light: number
}

export interface Thresholds {
  temperature: { min: number; max: number }
  humidity: { min: number; max: number }
  light: { min: number }
}

export type TimeRange = '24h' | '7d' | '30d'

export interface NodeStatus {
  connected: boolean
  lastUpdate: string
  nodeName: string
}
