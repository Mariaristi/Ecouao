import type { AlertLevel, MetricKey, SensorReading, Thresholds, TimeRange } from '../types/sensor'

export const UMBRALES: Thresholds = {
  temperature: { min: 20, max: 26 },
  humidity: { min: 40, max: 60 },
  light: { min: 300 },
}

export const UBICACION_NODO = 'Salón 3115'

export const TOOLTIP_MEDICION: Record<MetricKey, string> = {
  temperature: 'Medida por el sensor DHT22 cada 3 segundos',
  humidity: 'Medida por el sensor DHT22 cada 3 segundos',
  light: 'Medida por el sensor LDR cada 3 segundos',
}

const MENSAJES_ATENCION: Record<MetricKey, string> = {
  temperature: 'La temperatura está alta, considera ventilar',
  humidity: 'La humedad está fuera de rango, revisa la ventilación',
  light: 'La iluminación es insuficiente, enciende más luces',
}

/** Texto descriptivo que se muestra debajo de cada métrica según su estado. */
export function mensajeEstado(metrica: MetricKey, nivel: AlertLevel): string {
  if (nivel === 'ok') return 'Condiciones ideales para estudiar'
  return MENSAJES_ATENCION[metrica]
}

/** Texto de la alerta corta que aparece en las cards fuera de rango, con la ubicación del nodo. */
export function alertaConUbicacion(nivel: AlertLevel): string | null {
  if (nivel === 'warn') return `⚠️ Atención en ${UBICACION_NODO}`
  if (nivel === 'danger') return `🔴 Fuera de rango en ${UBICACION_NODO}`
  return null
}

/** Texto explicativo del tooltip al pasar el mouse sobre el estado (Óptimo/Atención). */
export function textoAyudaEstado(metrica: MetricKey, nivel: AlertLevel): string {
  if (metrica === 'temperature') {
    return nivel === 'ok'
      ? 'Óptimo significa que está dentro del rango de confort (20-26°C)'
      : 'Fuera del rango de confort de 20-26°C'
  }
  if (metrica === 'humidity') {
    return nivel === 'ok'
      ? 'Óptimo significa que está dentro del rango de confort (40-60%)'
      : 'Fuera del rango de confort de 40-60%'
  }
  return nivel === 'ok'
    ? 'Óptimo significa que la iluminación es adecuada (300 lux o más)'
    : 'Iluminación por debajo de lo recomendado (300 lux)'
}

function numeroAleatorioEnRango(min: number, max: number) {
  return Math.round((min + Math.random() * (max - min)) * 10) / 10
}

/** Genera una serie de lecturas simuladas que termina en el momento actual. */
export function generarSerie(puntos: number, intervaloMinutos: number): SensorReading[] {
  const ahora = Date.now()
  const lecturas: SensorReading[] = []

  for (let i = puntos - 1; i >= 0; i--) {
    const t = new Date(ahora - i * intervaloMinutos * 60 * 1000)
    lecturas.push({
      timestamp: t.toISOString(),
      temperature: numeroAleatorioEnRango(19, 28),
      humidity: numeroAleatorioEnRango(35, 65),
      light: Math.round(numeroAleatorioEnRango(150, 800)),
    })
  }
  return lecturas
}

export function generarSerieParaRango(rango: TimeRange): SensorReading[] {
  switch (rango) {
    case '24h':
      return generarSerie(24, 60)
    case '7d':
      return generarSerie(7 * 24, 60 * 4)
    case '30d':
      return generarSerie(30, 60 * 24)
  }
}

export function ultimaLectura(serie: SensorReading[]): SensorReading {
  return serie[serie.length - 1]
}

export function siguienteLecturaSimulada(anterior: SensorReading): SensorReading {
  const variacion = () => (Math.random() - 0.5) * 1.2
  return {
    timestamp: new Date().toISOString(),
    temperature: Math.round((anterior.temperature + variacion()) * 10) / 10,
    humidity: Math.round((anterior.humidity + variacion() * 2) * 10) / 10,
    light: Math.round(anterior.light + (Math.random() - 0.5) * 40),
  }
}

export function nivelAlertaPara(metrica: MetricKey, valor: number): AlertLevel {
  if (metrica === 'temperature') {
    const { min, max } = UMBRALES.temperature
    if (valor < min - 3 || valor > max + 3) return 'danger'
    if (valor < min || valor > max) return 'warn'
    return 'ok'
  }
  if (metrica === 'humidity') {
    const { min, max } = UMBRALES.humidity
    if (valor < min - 10 || valor > max + 10) return 'danger'
    if (valor < min || valor > max) return 'warn'
    return 'ok'
  }
  const { min } = UMBRALES.light
  if (valor < min - 150) return 'danger'
  if (valor < min) return 'warn'
  return 'ok'
}
