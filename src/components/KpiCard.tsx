import type { ReactNode } from 'react'
import Card from './Card'
import Badge from './Badge'
import type { AlertLevel } from '../types/sensor'

interface KpiCardProps {
  label: string
  value: string
  unit?: string
  icon: ReactNode
  level: AlertLevel
  trend?: string
}

export default function KpiCard({ label, value, unit, icon, level, trend }: KpiCardProps) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-eco-pale text-eco-primary">
          {icon}
        </div>
        <Badge level={level} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="mt-1 text-3xl font-extrabold tracking-tight text-gray-800">
          {value}
          {unit && <span className="ml-1 text-base font-semibold text-gray-400">{unit}</span>}
        </p>
      </div>
      {trend && (
        <p className="text-xs font-semibold text-eco-primary/90">{trend} vs. hace 1h</p>
      )}
    </Card>
  )
}
