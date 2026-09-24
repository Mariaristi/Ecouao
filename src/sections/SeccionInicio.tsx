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
        <Tarjeta className="flex flex-col gap-4 lg:col-span-1">
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
            <p className="mt-1 text-sm font-semibold text-gray-700">{nodeStatus.location}</p>
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
