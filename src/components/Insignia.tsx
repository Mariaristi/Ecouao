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

interface InsigniaProps {
  level: AlertLevel
  label?: string
  helpText?: string
}

export default function Insignia({ level, label, helpText }: InsigniaProps) {
  const badge = (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${STYLES[level]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label ?? LABELS[level]}
    </span>
  )

  if (!helpText) return badge

  return (
    <span className="group/estado relative inline-flex cursor-help">
      {badge}
      <span className="pointer-events-none absolute bottom-full right-0 z-50 mb-2 w-56 rounded-lg bg-gray-800 px-3 py-2 text-center text-xs font-medium leading-snug text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover/estado:opacity-100">
        {helpText}
        <span className="absolute right-3 top-full border-4 border-transparent border-t-gray-800" />
      </span>
    </span>
  )
}
