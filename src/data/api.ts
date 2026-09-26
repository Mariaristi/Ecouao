import type { SensorReading } from '../types/sensor'

const API_URL = 'http://127.0.0.1:5000'

interface LecturaBackend {
  id: number
  temperatura: number
  humedad: number
  luz: number
  fecha_hora: string
}

function mapearLectura(l: LecturaBackend): SensorReading {
  return {
    timestamp: new Date(l.fecha_hora.replace(' ', 'T')).toISOString(),
    temperature: l.temperatura,
    humidity: l.humedad,
    light: l.luz,
  }
}

export async function obtenerHistorial(): Promise<SensorReading[]> {
  const respuesta = await fetch(`${API_URL}/historial`)
  const datos: LecturaBackend[] = await respuesta.json()
  return datos.map(mapearLectura).reverse()
}
export async function obtenerHistorialPorRango(rango: '24h' | '7d' | '30d'): Promise<SensorReading[]> {
  const respuesta = await fetch(`${API_URL}/historial?rango=${rango}`)
  const datos: LecturaBackend[] = await respuesta.json()
  return datos.map(mapearLectura)
}