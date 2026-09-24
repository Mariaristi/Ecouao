import { useEffect, useMemo, useRef, useState } from 'react'
import BarraLateral, { type SectionId } from './components/BarraLateral'
import Encabezado from './components/Encabezado'
import SeccionInicio from './sections/SeccionInicio'
import SeccionMonitoreo from './sections/SeccionMonitoreo'
import SeccionHistorial from './sections/SeccionHistorial'
import {
  UBICACION_NODO,
  generarSerie,
  generarSerieParaRango,
  ultimaLectura,
  siguienteLecturaSimulada,
} from './data/datosSimulados'
import type { NodeStatus, SensorReading, TimeRange } from './types/sensor'

function exportarCsv(filas: SensorReading[]) {
  const encabezado = 'timestamp,temperature,humidity,light\n'
  const cuerpo = filas
    .map((r) => `${r.timestamp},${r.temperature},${r.humidity},${r.light}`)
    .join('\n')
  const blob = new Blob([encabezado + cuerpo], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `ecouao-historial-${Date.now()}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

export default function App() {
  const [serieEnVivo, setSerieEnVivo] = useState<SensorReading[]>(() => generarSerie(24, 5))
  const [rangoHistorial, setRangoHistorial] = useState<TimeRange>('24h')
  const [serieHistorial, setSerieHistorial] = useState<SensorReading[]>(() =>
    generarSerieParaRango('24h'),
  )
  const [seccionActiva, setSeccionActiva] = useState<SectionId>('inicio')
  const [sidebarAbierto, setSidebarAbierto] = useState(false)

  const [estadoNodo] = useState<NodeStatus>({
    connected: true,
    lastUpdate: new Date().toISOString(),
    nodeName: 'ESP32 · Nodo 01',
    location: UBICACION_NODO,
  })

  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSerieEnVivo((prev) => {
        const anterior = prev[prev.length - 1]
        const siguiente = siguienteLecturaSimulada(anterior)
        return [...prev.slice(1), siguiente]
      })
    }, 3000)
    return () => clearInterval(intervalo)
  }, [])

  useEffect(() => {
    setSerieHistorial(generarSerieParaRango(rangoHistorial))
  }, [rangoHistorial])

  const ultima = useMemo(() => ultimaLectura(serieEnVivo), [serieEnVivo])

  const handleNavegar = (id: SectionId) => {
    setSeccionActiva(id)
    setSidebarAbierto(false)
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex min-h-screen bg-[#f6faf0]">
      <BarraLateral
        active={seccionActiva}
        onNavigate={handleNavegar}
        open={sidebarAbierto}
        onClose={() => setSidebarAbierto(false)}
      />

      <div className="flex min-h-screen flex-1 flex-col">
        <Encabezado onMenuClick={() => setSidebarAbierto(true)} />

        <main
          ref={mainRef}
          className="flex flex-1 flex-col gap-10 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8"
        >
          {seccionActiva === 'inicio' && (
            <SeccionInicio latest={ultima} nodeStatus={estadoNodo} />
          )}
          {seccionActiva === 'monitoreo' && (
            <SeccionMonitoreo series={serieEnVivo} latest={ultima} />
          )}
          {seccionActiva === 'historial' && (
            <SeccionHistorial
              series={serieHistorial}
              range={rangoHistorial}
              onRangeChange={setRangoHistorial}
              onExport={() => exportarCsv(serieHistorial)}
            />
          )}

          <footer className="pb-6 pt-4 text-center text-xs text-gray-400">
            ECO UAO · Universidad Autónoma de Occidente · Cali, Colombia
          </footer>
        </main>
      </div>
    </div>
  )
}
