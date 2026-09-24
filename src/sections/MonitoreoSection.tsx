import Card from '../components/Card'
import Badge from '../components/Badge'
import SensorChart from '../components/SensorChart'
import { ThermometerIcon, DropletIcon, SunIcon } from '../components/icons'
import { THRESHOLDS, alertLevelFor } from '../data/mockData'
import type { SensorReading } from '../types/sensor'

interface MonitoreoSectionProps {
  series: SensorReading[]
  latest: SensorReading
}

export default function MonitoreoSection({ series, latest }: MonitoreoSectionProps) {
  return (
    <section className="scroll-mt-24">
      <div className="mb-6 flex flex-col gap-1">
        <h2 className="text-2xl font-extrabold text-gray-800">Monitoreo en Vivo</h2>
        <p className="text-sm text-gray-500">
          Lecturas en tiempo real del nodo · actualización automática cada 3 segundos
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-eco-pale text-eco-primary">
                <ThermometerIcon width={16} height={16} />
              </span>
              Temperatura
            </div>
            <Badge level={alertLevelFor('temperature', latest.temperature)} />
          </div>
          <p className="mt-4 text-3xl font-extrabold text-gray-800">
            {latest.temperature.toFixed(1)}
            <span className="ml-1 text-base font-semibold text-gray-400">°C</span>
          </p>
          <div className="mt-3">
            <SensorChart
              data={series}
              dataKey="temperature"
              color="#a9db2c"
              unit="°C"
              thresholdMin={THRESHOLDS.temperature.min}
              thresholdMax={THRESHOLDS.temperature.max}
            />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-eco-pale text-eco-primary">
                <DropletIcon width={16} height={16} />
              </span>
              Humedad
            </div>
            <Badge level={alertLevelFor('humidity', latest.humidity)} />
          </div>
          <p className="mt-4 text-3xl font-extrabold text-gray-800">
            {latest.humidity.toFixed(0)}
            <span className="ml-1 text-base font-semibold text-gray-400">%</span>
          </p>
          <div className="mt-3">
            <SensorChart
              data={series}
              dataKey="humidity"
              color="#4f9d3a"
              unit="%"
              thresholdMin={THRESHOLDS.humidity.min}
              thresholdMax={THRESHOLDS.humidity.max}
            />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-eco-pale text-eco-primary">
                <SunIcon width={16} height={16} />
              </span>
              Iluminación
            </div>
            <Badge level={alertLevelFor('light', latest.light)} />
          </div>
          <p className="mt-4 text-3xl font-extrabold text-gray-800">
            {latest.light.toFixed(0)}
            <span className="ml-1 text-base font-semibold text-gray-400">lux</span>
          </p>
          <div className="mt-3">
            <SensorChart
              data={series}
              dataKey="light"
              color="#d4a72c"
              unit="lux"
              thresholdMin={THRESHOLDS.light.min}
            />
          </div>
        </Card>
      </div>
    </section>
  )
}
