import { useEffect, useMemo, useRef, useState } from 'react'
import Sidebar, { type SectionId } from './components/Sidebar'
import Header from './components/Header'
import InicioSection from './sections/InicioSection'
import MonitoreoSection from './sections/MonitoreoSection'
import HistorialSection from './sections/HistorialSection'
import { generateSeries, generateSeriesForRange, latestReading, nextMockReading } from './data/mockData'
import type { NodeStatus, SensorReading, TimeRange } from './types/sensor'

function exportToCsv(rows: SensorReading[]) {
  const header = 'timestamp,temperature,humidity,light\n'
  const body = rows
    .map((r) => `${r.timestamp},${r.temperature},${r.humidity},${r.light}`)
    .join('\n')
  const blob = new Blob([header + body], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `ecouao-historial-${Date.now()}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

export default function App() {
  const [liveSeries, setLiveSeries] = useState<SensorReading[]>(() => generateSeries(24, 5))
  const [historyRange, setHistoryRange] = useState<TimeRange>('24h')
  const [historySeries, setHistorySeries] = useState<SensorReading[]>(() =>
    generateSeriesForRange('24h'),
  )
  const [active, setActive] = useState<SectionId>('inicio')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [nodeStatus] = useState<NodeStatus>({
    connected: true,
    lastUpdate: new Date().toISOString(),
    nodeName: 'ESP32 · Nodo 01',
  })

  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveSeries((prev) => {
        const last = prev[prev.length - 1]
        const next = nextMockReading(last)
        return [...prev.slice(1), next]
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setHistorySeries(generateSeriesForRange(historyRange))
  }, [historyRange])

  const latest = useMemo(() => latestReading(liveSeries), [liveSeries])

  const handleNavigate = (id: SectionId) => {
    setActive(id)
    setSidebarOpen(false)
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex min-h-screen bg-[#f6faf0]">
      <Sidebar
        active={active}
        onNavigate={handleNavigate}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-h-screen flex-1 flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main
          ref={mainRef}
          className="flex flex-1 flex-col gap-10 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8"
        >
          {active === 'inicio' && <InicioSection latest={latest} nodeStatus={nodeStatus} />}
          {active === 'monitoreo' && <MonitoreoSection series={liveSeries} latest={latest} />}
          {active === 'historial' && (
            <HistorialSection
              series={historySeries}
              range={historyRange}
              onRangeChange={setHistoryRange}
              onExport={() => exportToCsv(historySeries)}
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
