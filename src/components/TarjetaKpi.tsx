import type { ReactNode } from 'react'
import Tarjeta from './Tarjeta'
import Insignia from './Insignia'
import Tooltip from './Tooltip'
import { TOOLTIP_MEDICION, alertaConUbicacion, mensajeEstado, textoAyudaEstado } from '../data/datosSimulados'
import type { AlertLevel, MetricKey } from '../types/sensor'

interface TarjetaKpiProps {
  label: string
  value: string
  unit?: string
  icon: ReactNode
  level: AlertLevel
  metric: MetricKey
  trend?: string
}

export default function TarjetaKpi({ label, value, unit, icon, level, metric, trend }: TarjetaKpiProps) {
  const alerta = alertaConUbicacion(level)

  return (
    <Tarjeta className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-eco-pale text-eco-primary">
          {icon}
        </div>
        <Insignia level={level} helpText={textoAyudaEstado(metric, level)} />
      </div>
      <div>
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <Tooltip text={TOOLTIP_MEDICION[metric]} />
        </div>
        <p className="mt-1 text-3xl font-extrabold tracking-tight text-gray-800">
          {value}
          {unit && <span className="ml-1 text-base font-semibold text-gray-400">{unit}</span>}
        </p>
      </div>
      {trend && (
        <p className="text-xs font-semibold text-eco-primary/90">{trend} vs. hace 1h</p>
      )}
      <p className="text-xs text-gray-500">{mensajeEstado(metric, level)}</p>
      {alerta && <p className="text-xs font-semibold text-red-600">{alerta}</p>}
    </Tarjeta>
  )
}
