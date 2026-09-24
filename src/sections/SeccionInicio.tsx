import Tarjeta from '../components/Tarjeta'
import TarjetaKpi from '../components/TarjetaKpi'
import Insignia from '../components/Insignia'
import { ThermometerIcon, DropletIcon, SunIcon, WifiIcon } from '../components/iconos'
import { nivelAlertaPara } from '../data/datosSimulados'
import type { NodeStatus, SensorReading } from '../types/sensor'

interface SeccionInicioProps {
  latest: SensorReading
  nodeStatus: NodeStatus
}

export default function SeccionInicio({ latest, nodeStatus }: SeccionInicioProps) {
  return (
    <section className="scroll-mt-24">
      <div className="mb-6 flex flex-col gap-1">
        <h2 className="text-2xl font-extrabold text-gray-800">Inicio</h2>
        <p className="text-sm text-gray-500">
          Resumen general del nodo de monitoreo ambiental ECO UAO
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <TarjetaKpi
          label="Temperatura actual"
          value={latest.temperature.toFixed(1)}
          unit="°C"
          icon={<ThermometerIcon />}
          level={nivelAlertaPara('temperature', latest.temperature)}
          metric="temperature"
          trend="+0.4°C"
        />
        <TarjetaKpi
          label="Humedad relativa"
          value={latest.humidity.toFixed(0)}
          unit="%"
          icon={<DropletIcon />}
          level={nivelAlertaPara('humidity', latest.humidity)}
          metric="humidity"
          trend="-1.2%"
        />
        <TarjetaKpi
          label="Iluminación"
          value={latest.light.toFixed(0)}
          unit="lux"
          icon={<SunIcon />}
          level={nivelAlertaPara('light', latest.light)}
          metric="light"
          trend="+18 lux"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Tarjeta className="lg:col-span-2">
          <h3 className="text-base font-bold text-gray-800">Proyecto ECO UAO</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            Sistema de monitoreo ambiental con computación física desarrollado en la
            Universidad Autónoma de Occidente. Un nodo físico basado en{' '}
            <span className="font-semibold text-gray-700">ESP32</span> con sensores{' '}
            <span className="font-semibold text-gray-700">DHT22</span> (temperatura y
            humedad) y <span className="font-semibold text-gray-700">LDR</span>{' '}
            (iluminación) envía lecturas periódicas que se visualizan en este panel.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-eco-pale/60 py-3">
              <p className="text-xs font-semibold text-gray-500">Asignatura</p>
              <p className="mt-1 text-sm font-bold text-gray-800">Computación Física</p>
            </div>
            <div className="rounded-xl bg-eco-pale/60 py-3">
              <p className="text-xs font-semibold text-gray-500">Ubicación</p>
              <p className="mt-1 text-sm font-bold text-gray-800">Cali, Colombia</p>
            </div>
            <div className="rounded-xl bg-eco-pale/60 py-3">
              <p className="text-xs font-semibold text-gray-500">Institución</p>
              <p className="mt-1 text-sm font-bold text-gray-800">UAO</p>
            </div>
          </div>
        </Tarjeta>

        <Tarjeta className="flex flex-col gap-4">
          <h3 className="text-base font-bold text-gray-800">Estado del nodo</h3>
          <div className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                nodeStatus.connected ? 'bg-eco-pale text-eco-primary' : 'bg-red-50 text-red-500'
              }`}
            >
              <WifiIcon />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{nodeStatus.nodeName}</p>
              <Insignia level={nodeStatus.connected ? 'ok' : 'danger'} label={nodeStatus.connected ? 'Conectado' : 'Desconectado'} />
            </div>
          </div>
          <div className="rounded-xl bg-gray-50 px-4 py-3">
            <p className="text-xs font-medium text-gray-400">Ubicación del nodo</p>
            <p className="mt-1 text-sm font-semibold text-gray-700">📍 {nodeStatus.location}</p>
          </div>
          <div className="rounded-xl bg-gray-50 px-4 py-3">
            <p className="text-xs font-medium text-gray-400">Última actualización</p>
            <p className="mt-1 text-sm font-semibold text-gray-700">
              {new Date(nodeStatus.lastUpdate).toLocaleString('es-CO')}
            </p>
          </div>
        </Tarjeta>
      </div>
    </section>
  )
}
