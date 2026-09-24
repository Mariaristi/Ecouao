import Tarjeta from '../components/Tarjeta'
import Insignia from '../components/Insignia'
import GraficoSensor from '../components/GraficoSensor'
import { DownloadIcon } from '../components/iconos'
import { UMBRALES, nivelAlertaPara } from '../data/datosSimulados'
import type { SensorReading, TimeRange } from '../types/sensor'

interface SeccionHistorialProps {
  series: SensorReading[]
  range: TimeRange
  onRangeChange: (range: TimeRange) => void
  onExport: () => void
}

const OPCIONES_RANGO: { id: TimeRange; label: string }[] = [
  { id: '24h', label: '24 horas' },
  { id: '7d', label: '7 días' },
  { id: '30d', label: '30 días' },
]

function nivelGeneral(lectura: SensorReading) {
  const niveles = [
    nivelAlertaPara('temperature', lectura.temperature),
    nivelAlertaPara('humidity', lectura.humidity),
    nivelAlertaPara('light', lectura.light),
  ]
  if (niveles.includes('danger')) return 'danger' as const
  if (niveles.includes('warn')) return 'warn' as const
  return 'ok' as const
}

export default function SeccionHistorial({
  series,
  range,
  onRangeChange,
  onExport,
}: SeccionHistorialProps) {
  const filas = [...series].reverse().slice(0, 12)

  return (
    <section className="scroll-mt-24">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-800">Historial</h2>
          <p className="text-sm text-gray-500">Tendencias y registros históricos del nodo</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-xl bg-gray-100 p-1">
            {OPCIONES_RANGO.map((opt) => (
              <button
                key={opt.id}
                onClick={() => onRangeChange(opt.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors duration-200 ${
                  range === opt.id
                    ? 'bg-white text-gray-800 shadow-card'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button
            onClick={onExport}
            className="flex items-center gap-2 rounded-xl bg-eco-primary px-4 py-2 text-xs font-bold text-white shadow-card transition-transform duration-200 hover:scale-[1.03] hover:shadow-cardHover"
          >
            <DownloadIcon width={16} height={16} />
            Exportar CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Tarjeta className="lg:col-span-2">
          <h3 className="text-sm font-bold text-gray-700">Temperatura (°C)</h3>
          <GraficoSensor
            data={series}
            dataKey="temperature"
            color="#a9db2c"
            unit="°C"
            range={range}
            thresholdMin={UMBRALES.temperature.min}
            thresholdMax={UMBRALES.temperature.max}
          />
        </Tarjeta>
        <Tarjeta>
          <h3 className="text-sm font-bold text-gray-700">Humedad (%)</h3>
          <GraficoSensor
            data={series}
            dataKey="humidity"
            color="#4f9d3a"
            unit="%"
            range={range}
            thresholdMin={UMBRALES.humidity.min}
            thresholdMax={UMBRALES.humidity.max}
          />
        </Tarjeta>
      </div>

      <Tarjeta className="mt-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-700">Registros recientes</h3>
          <span className="text-xs font-medium text-gray-400">{filas.length} registros</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                <th className="pb-3 pr-4">Fecha</th>
                <th className="pb-3 pr-4">Hora</th>
                <th className="pb-3 pr-4">Temp.</th>
                <th className="pb-3 pr-4">Humedad</th>
                <th className="pb-3 pr-4">Luz</th>
                <th className="pb-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filas.map((r, idx) => (
                <tr
                  key={r.timestamp}
                  className={`border-t border-gray-100 transition-colors duration-150 hover:bg-eco-pale/30 ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'
                  }`}
                >
                  <td className="py-3 pr-4 font-medium text-gray-700">
                    {new Date(r.timestamp).toLocaleDateString('es-CO')}
                  </td>
                  <td className="py-3 pr-4 text-gray-500">
                    {new Date(r.timestamp).toLocaleTimeString('es-CO', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="py-3 pr-4 text-gray-700">{r.temperature.toFixed(1)} °C</td>
                  <td className="py-3 pr-4 text-gray-700">{r.humidity.toFixed(0)} %</td>
                  <td className="py-3 pr-4 text-gray-700">{r.light.toFixed(0)} lux</td>
                  <td className="py-3">
                    <Insignia level={nivelGeneral(r)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Tarjeta>
    </section>
  )
}
