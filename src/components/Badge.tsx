import type { AlertLevel } from '../types/sensor'

const STYLES: Record<AlertLevel, string> = {
  ok: 'bg-eco-primary/15 text-green-800',
  warn: 'bg-eco-warn text-yellow-800',
  danger: 'bg-red-100 text-red-700',
}

const LABELS: Record<AlertLevel, string> = {
  ok: 'Óptimo',
  warn: 'Atención',
  danger: 'Fuera de rango',
}

export default function Badge({ level, label }: { level: AlertLevel; label?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${STYLES[level]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label ?? LABELS[level]}
    </span>
  )
}
