import type { AlertLevel, SensorReading, Thresholds, TimeRange } from '../types/sensor'

export const THRESHOLDS: Thresholds = {
  temperature: { min: 20, max: 26 },
  humidity: { min: 40, max: 60 },
  light: { min: 300 },
}

function randomInRange(min: number, max: number) {
  return Math.round((min + Math.random() * (max - min)) * 10) / 10
}

/** Generates a deterministic-ish series of mock sensor readings ending at "now". */
export function generateSeries(points: number, intervalMinutes: number): SensorReading[] {
  const now = Date.now()
  const readings: SensorReading[] = []

  for (let i = points - 1; i >= 0; i--) {
    const t = new Date(now - i * intervalMinutes * 60 * 1000)
    readings.push({
      timestamp: t.toISOString(),
      temperature: randomInRange(19, 28),
      humidity: randomInRange(35, 65),
      light: Math.round(randomInRange(150, 800)),
    })
  }
  return readings
}

export function generateSeriesForRange(range: TimeRange): SensorReading[] {
  switch (range) {
    case '24h':
      return generateSeries(24, 60)
    case '7d':
      return generateSeries(7 * 24, 60 * 4)
    case '30d':
      return generateSeries(30, 60 * 24)
  }
}

export function latestReading(series: SensorReading[]): SensorReading {
  return series[series.length - 1]
}

export function nextMockReading(previous: SensorReading): SensorReading {
  const drift = () => (Math.random() - 0.5) * 1.2
  return {
    timestamp: new Date().toISOString(),
    temperature: Math.round((previous.temperature + drift()) * 10) / 10,
    humidity: Math.round((previous.humidity + drift() * 2) * 10) / 10,
    light: Math.round(previous.light + (Math.random() - 0.5) * 40),
  }
}

export function alertLevelFor(
  metric: 'temperature' | 'humidity' | 'light',
  value: number,
): AlertLevel {
  if (metric === 'temperature') {
    const { min, max } = THRESHOLDS.temperature
    if (value < min - 3 || value > max + 3) return 'danger'
    if (value < min || value > max) return 'warn'
    return 'ok'
  }
  if (metric === 'humidity') {
    const { min, max } = THRESHOLDS.humidity
    if (value < min - 10 || value > max + 10) return 'danger'
    if (value < min || value > max) return 'warn'
    return 'ok'
  }
  const { min } = THRESHOLDS.light
  if (value < min - 150) return 'danger'
  if (value < min) return 'warn'
  return 'ok'
}
