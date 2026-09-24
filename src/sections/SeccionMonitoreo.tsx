import Tarjeta from '../components/Tarjeta'
import Insignia from '../components/Insignia'
import Tooltip from '../components/Tooltip'
import GraficoSensor from '../components/GraficoSensor'
import { ThermometerIcon, DropletIcon, SunIcon } from '../components/iconos'
import {
  TOOLTIP_MEDICION,
  UMBRALES,
  alertaConUbicacion,
  mensajeEstado,
  nivelAlertaPara,
  textoAyudaEstado,
} from '../data/datosSimulados'
import type { SensorReading } from '../types/sensor'

interface SeccionMonitoreoProps {
  series: SensorReading[]
  latest: SensorReading
}

export default function SeccionMonitoreo({ series, latest }: SeccionMonitoreoProps) {
  const nivelTemperatura = nivelAlertaPara('temperature', latest.temperature)
  const nivelHumedad = nivelAlertaPara('humidity', latest.humidity)
  const nivelLuz = nivelAlertaPara('light', latest.light)

  return (
    <section className="scroll-mt-24">
      <div className="mb-6 flex flex-col gap-1">
        <h2 className="text-2xl font-extrabold text-gray-800">Monitoreo en Vivo</h2>
        <p className="text-sm text-gray-500">
          Lecturas en tiempo real del nodo · actualización automática cada 3 segundos
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Tarjeta>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-eco-pale text-eco-primary">
                <ThermometerIcon width={16} height={16} />
              </span>
              Temperatura
              <Tooltip text={TOOLTIP_MEDICION.temperature} />
            </div>
            <Insignia level={nivelTemperatura} helpText={textoAyudaEstado('temperature', nivelTemperatura)} />
          </div>
          <p className="mt-4 text-3xl font-extrabold text-gray-800">
            {latest.temperature.toFixed(1)}
            <span className="ml-1 text-base font-semibold text-gray-400">°C</span>
          </p>
          <div className="mt-3">
            <GraficoSensor
              data={series}
              dataKey="temperature"
              color="#a9db2c"
              unit="°C"
              thresholdMin={UMBRALES.temperature.min}
              thresholdMax={UMBRALES.temperature.max}
            />
          </div>
          <p className="mt-2 text-xs text-gray-500">{mensajeEstado('temperature', nivelTemperatura)}</p>
          {alertaConUbicacion(nivelTemperatura) && (
            <p className="mt-1 text-xs font-semibold text-red-600">
              {alertaConUbicacion(nivelTemperatura)}
            </p>
          )}
        </Tarjeta>

        <Tarjeta>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-eco-pale text-eco-primary">
                <DropletIcon width={16} height={16} />
              </span>
              Humedad
              <Tooltip text={TOOLTIP_MEDICION.humidity} />
            </div>
            <Insignia level={nivelHumedad} helpText={textoAyudaEstado('humidity', nivelHumedad)} />
          </div>
          <p className="mt-4 text-3xl font-extrabold text-gray-800">
            {latest.humidity.toFixed(0)}
            <span className="ml-1 text-base font-semibold text-gray-400">%</span>
          </p>
          <div className="mt-3">
            <GraficoSensor
              data={series}
              dataKey="humidity"
              color="#4f9d3a"
              unit="%"
              thresholdMin={UMBRALES.humidity.min}
              thresholdMax={UMBRALES.humidity.max}
            />
          </div>
          <p className="mt-2 text-xs text-gray-500">{mensajeEstado('humidity', nivelHumedad)}</p>
          {alertaConUbicacion(nivelHumedad) && (
            <p className="mt-1 text-xs font-semibold text-red-600">
              {alertaConUbicacion(nivelHumedad)}
            </p>
          )}
        </Tarjeta>

        <Tarjeta>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-eco-pale text-eco-primary">
                <SunIcon width={16} height={16} />
              </span>
              Iluminación
              <Tooltip text={TOOLTIP_MEDICION.light} />
            </div>
            <Insignia level={nivelLuz} helpText={textoAyudaEstado('light', nivelLuz)} />
          </div>
          <p className="mt-4 text-3xl font-extrabold text-gray-800">
            {latest.light.toFixed(0)}
            <span className="ml-1 text-base font-semibold text-gray-400">lux</span>
          </p>
          <div className="mt-3">
            <GraficoSensor
              data={series}
              dataKey="light"
              color="#d4a72c"
              unit="lux"
              thresholdMin={UMBRALES.light.min}
            />
          </div>
          <p className="mt-2 text-xs text-gray-500">{mensajeEstado('light', nivelLuz)}</p>
          {alertaConUbicacion(nivelLuz) && (
            <p className="mt-1 text-xs font-semibold text-red-600">{alertaConUbicacion(nivelLuz)}</p>
          )}
        </Tarjeta>
      </div>
    </section>
  )
}
